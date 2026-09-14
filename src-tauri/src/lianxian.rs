use serde::Serialize;
use base64::Engine;

#[derive(Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct WindowHit {
    pub hwnd: String,
    pub title: String,
    pub class_name: String,
    pub parent_class_name: String,
    pub client_width: i32,
    pub client_height: i32,
    pub cursor_client_x: i32,
    pub cursor_client_y: i32,
    pub screen_x: i32,
    pub screen_y: i32,
}

#[derive(Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct CaptureResult {
    pub hwnd: String,
    pub mime: String,
    pub data_base64: String,
    pub width: i32,
    pub height: i32,
}

#[derive(Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ScreenPoint {
    pub x: i32,
    pub y: i32,
}

#[cfg(not(windows))]
mod platform {
    use super::*;

    fn unsupported() -> String {
        "Board linking is only available on Windows".to_string()
    }

    pub fn cursor_window_info() -> Result<WindowHit, String> {
        Err(unsupported())
    }

    pub fn find_window(
        _class_name: String,
        _client_width: i32,
        _client_height: i32,
        _title_includes: Option<String>,
        _preferred_hwnd: Option<String>,
    ) -> Result<WindowHit, String> {
        Err(unsupported())
    }

    pub fn capture_window(_hwnd: String) -> Result<CaptureResult, String> {
        Err(unsupported())
    }

    pub fn click_client(_hwnd: String, _x: i32, _y: i32, _bring_to_front: bool) -> Result<(), String> {
        Err(unsupported())
    }

    pub fn client_to_screen(_hwnd: String, _x: i32, _y: i32) -> Result<ScreenPoint, String> {
        Err(unsupported())
    }

    pub fn is_window_valid(_hwnd: String) -> Result<bool, String> {
        Err(unsupported())
    }

    pub fn is_ctrl_down() -> Result<bool, String> {
        Err(unsupported())
    }
}

#[cfg(windows)]
mod platform {
    use super::*;
    use std::mem::{size_of, zeroed};
    use windows::Win32::Foundation::{BOOL, HWND, LPARAM, POINT, RECT};
    use windows::Win32::Graphics::Gdi::{
        BitBlt, ClientToScreen, CreateCompatibleBitmap, CreateCompatibleDC, DeleteDC, DeleteObject,
        GetDC, GetDIBits, ReleaseDC, SelectObject, BITMAPINFO, BITMAPINFOHEADER, DIB_RGB_COLORS,
        HGDIOBJ, SRCCOPY,
    };
    use windows::Win32::Storage::Xps::{PrintWindow, PRINT_WINDOW_FLAGS, PW_CLIENTONLY};
    use windows::Win32::UI::Input::KeyboardAndMouse::{
        GetAsyncKeyState, SendInput, INPUT, INPUT_0, INPUT_MOUSE, MOUSEEVENTF_ABSOLUTE,
        MOUSEEVENTF_LEFTDOWN, MOUSEEVENTF_LEFTUP, MOUSEEVENTF_MOVE, MOUSEINPUT, VK_CONTROL,
    };
    use windows::Win32::UI::WindowsAndMessaging::{
        EnumWindows, GetAncestor, GetClassNameW, GetClientRect, GetCursorPos, GetParent,
        GetSystemMetrics, GetWindowTextW, IsIconic, IsWindow, IsWindowVisible, SetForegroundWindow,
        ShowWindow, WindowFromPoint, GA_ROOT, SM_CXSCREEN, SM_CYSCREEN, SW_RESTORE,
    };

    const PW_RENDERFULLCONTENT: PRINT_WINDOW_FLAGS = PRINT_WINDOW_FLAGS(2);

    fn hwnd_to_string(hwnd: HWND) -> String {
        (hwnd.0 as usize as u64).to_string()
    }

    fn parse_hwnd(s: &str) -> Result<HWND, String> {
        let value: u64 = s
            .parse()
            .map_err(|_| format!("Invalid window handle: {}", s))?;
        Ok(HWND(value as *mut core::ffi::c_void))
    }

    fn wide_to_string(buf: &[u16]) -> String {
        let len = buf.iter().position(|&c| c == 0).unwrap_or(buf.len());
        String::from_utf16_lossy(&buf[..len])
    }

    fn class_name(hwnd: HWND) -> String {
        let mut buf = [0u16; 256];
        let n = unsafe { GetClassNameW(hwnd, &mut buf) };
        if n <= 0 {
            String::new()
        } else {
            wide_to_string(&buf[..n as usize])
        }
    }

    fn window_title(hwnd: HWND) -> String {
        let mut buf = [0u16; 512];
        let n = unsafe { GetWindowTextW(hwnd, &mut buf) };
        if n <= 0 {
            String::new()
        } else {
            wide_to_string(&buf[..n as usize])
        }
    }

    fn client_size(hwnd: HWND) -> Result<(i32, i32), String> {
        let mut rect = RECT::default();
        unsafe {
            GetClientRect(hwnd, &mut rect)
                .map_err(|e| format!("GetClientRect failed: {}", e))?;
        }
        Ok((rect.right - rect.left, rect.bottom - rect.top))
    }

    fn screen_to_client(hwnd: HWND, screen: POINT) -> POINT {
        let mut origin = POINT { x: 0, y: 0 };
        unsafe {
            let _ = ClientToScreen(hwnd, &mut origin);
        }
        POINT {
            x: screen.x - origin.x,
            y: screen.y - origin.y,
        }
    }

    fn describe_hwnd(hwnd: HWND, cursor_screen: Option<POINT>) -> Result<WindowHit, String> {
        if hwnd.0.is_null() || unsafe { !IsWindow(hwnd).as_bool() } {
            return Err("Window is no longer valid".to_string());
        }
        let root = unsafe { GetAncestor(hwnd, GA_ROOT) };
        let target = if root.0.is_null() { hwnd } else { root };
        let (cw, ch) = client_size(target)?;
        let parent = unsafe { GetParent(target).ok() };
        let cursor = cursor_screen.unwrap_or(POINT { x: 0, y: 0 });
        let client = if cursor_screen.is_some() {
            screen_to_client(target, cursor)
        } else {
            POINT { x: 0, y: 0 }
        };
        Ok(WindowHit {
            hwnd: hwnd_to_string(target),
            title: window_title(target),
            class_name: class_name(target),
            parent_class_name: parent
                .filter(|hwnd| !hwnd.0.is_null())
                .map(class_name)
                .unwrap_or_default(),
            client_width: cw,
            client_height: ch,
            cursor_client_x: client.x,
            cursor_client_y: client.y,
            screen_x: cursor.x,
            screen_y: cursor.y,
        })
    }

    pub fn cursor_window_info() -> Result<WindowHit, String> {
        let mut pt = POINT { x: 0, y: 0 };
        unsafe {
            GetCursorPos(&mut pt).map_err(|e| format!("GetCursorPos failed: {}", e))?;
        }
        let hwnd = unsafe { WindowFromPoint(pt) };
        if hwnd.0.is_null() {
            return Err("No window under the cursor".to_string());
        }
        describe_hwnd(hwnd, Some(pt))
    }

    struct EnumState {
        class_name: String,
        client_width: i32,
        client_height: i32,
        title_includes: Option<String>,
        preferred_hwnd: Option<String>,
        matches: Vec<HWND>,
    }

    unsafe extern "system" fn enum_proc(hwnd: HWND, lparam: LPARAM) -> BOOL {
        let state = &mut *(lparam.0 as *mut EnumState);
        if !IsWindowVisible(hwnd).as_bool() {
            return BOOL(1);
        }
        if class_name(hwnd) != state.class_name {
            return BOOL(1);
        }
        if let Ok((w, h)) = client_size(hwnd) {
            if (w - state.client_width).abs() > 12 || (h - state.client_height).abs() > 12 {
                return BOOL(1);
            }
        } else {
            return BOOL(1);
        }
        if let Some(needle) = &state.title_includes {
            if !needle.is_empty() && !window_title(hwnd).contains(needle) {
                return BOOL(1);
            }
        }
        state.matches.push(hwnd);
        BOOL(1)
    }

    pub fn find_window(
        class_name_filter: String,
        client_width: i32,
        client_height: i32,
        title_includes: Option<String>,
        preferred_hwnd: Option<String>,
    ) -> Result<WindowHit, String> {
        if let Some(pref) = &preferred_hwnd {
            if let Ok(hwnd) = parse_hwnd(pref) {
                if unsafe { IsWindow(hwnd).as_bool() } {
                    if let Ok(info) = describe_hwnd(hwnd, None) {
                        let class_ok = class_name_filter.is_empty()
                            || info.class_name == class_name_filter;
                        let size_ok = (info.client_width - client_width).abs() <= 12
                            && (info.client_height - client_height).abs() <= 12;
                        if class_ok && size_ok {
                            return Ok(info);
                        }
                    }
                }
            }
        }

        let mut state = EnumState {
            class_name: class_name_filter,
            client_width,
            client_height,
            title_includes,
            preferred_hwnd,
            matches: Vec::new(),
        };
        unsafe {
            EnumWindows(Some(enum_proc), LPARAM(&mut state as *mut _ as isize))
                .map_err(|e| format!("EnumWindows failed: {}", e))?;
        }
        let hwnd = state
            .matches
            .into_iter()
            .next()
            .ok_or_else(|| "Target window not found (class/size mismatch)".to_string())?;
        describe_hwnd(hwnd, None)
    }

    fn encode_bmp_bgra(width: i32, height: i32, bgra: &[u8]) -> Vec<u8> {
        let row_stride = (width as usize) * 4;
        let pixel_size = row_stride * (height as usize);
        let file_size = 14 + 40 + pixel_size;
        let mut out = Vec::with_capacity(file_size);
        out.extend_from_slice(b"BM");
        out.extend_from_slice(&(file_size as u32).to_le_bytes());
        out.extend_from_slice(&0u16.to_le_bytes());
        out.extend_from_slice(&0u16.to_le_bytes());
        out.extend_from_slice(&54u32.to_le_bytes());
        out.extend_from_slice(&40u32.to_le_bytes());
        out.extend_from_slice(&width.to_le_bytes());
        out.extend_from_slice(&(-height).to_le_bytes()); // top-down
        out.extend_from_slice(&1u16.to_le_bytes());
        out.extend_from_slice(&32u16.to_le_bytes());
        out.extend_from_slice(&0u32.to_le_bytes());
        out.extend_from_slice(&(pixel_size as u32).to_le_bytes());
        out.extend_from_slice(&0u32.to_le_bytes());
        out.extend_from_slice(&0u32.to_le_bytes());
        out.extend_from_slice(&0u32.to_le_bytes());
        out.extend_from_slice(&0u32.to_le_bytes());
        out.extend_from_slice(&bgra[..pixel_size.min(bgra.len())]);
        out
    }

    pub fn capture_window(hwnd_str: String) -> Result<CaptureResult, String> {
        let hwnd = parse_hwnd(&hwnd_str)?;
        if unsafe { !IsWindow(hwnd).as_bool() } {
            return Err("Target window is no longer valid".to_string());
        }
        if unsafe { IsIconic(hwnd).as_bool() } {
            unsafe {
                let _ = ShowWindow(hwnd, SW_RESTORE);
            }
        }
        let (width, height) = client_size(hwnd)?;
        if width <= 0 || height <= 0 {
            return Err("Invalid client size".to_string());
        }

        unsafe {
            let hdc_window = GetDC(hwnd);
            if hdc_window.0.is_null() {
                return Err("GetDC failed".to_string());
            }
            let hdc_mem = CreateCompatibleDC(hdc_window);
            if hdc_mem.0.is_null() {
                ReleaseDC(hwnd, hdc_window);
                return Err("CreateCompatibleDC failed".to_string());
            }
            let hbmp = CreateCompatibleBitmap(hdc_window, width, height);
            if hbmp.0.is_null() {
                let _ = DeleteDC(hdc_mem);
                ReleaseDC(hwnd, hdc_window);
                return Err("CreateCompatibleBitmap failed".to_string());
            }
            let old = SelectObject(hdc_mem, HGDIOBJ(hbmp.0));
            let printed = PrintWindow(
                hwnd,
                hdc_mem,
                PRINT_WINDOW_FLAGS(PW_CLIENTONLY.0 | PW_RENDERFULLCONTENT.0),
            )
            .as_bool();
            if !printed {
                let _ = BitBlt(hdc_mem, 0, 0, width, height, hdc_window, 0, 0, SRCCOPY);
            }

            let mut info: BITMAPINFO = zeroed();
            info.bmiHeader.biSize = size_of::<BITMAPINFOHEADER>() as u32;
            info.bmiHeader.biWidth = width;
            info.bmiHeader.biHeight = -height;
            info.bmiHeader.biPlanes = 1;
            info.bmiHeader.biBitCount = 32;
            info.bmiHeader.biCompression = 0;

            let mut pixels = vec![0u8; (width as usize) * (height as usize) * 4];
            let copied = GetDIBits(
                hdc_mem,
                hbmp,
                0,
                height as u32,
                Some(pixels.as_mut_ptr() as *mut _),
                &mut info,
                DIB_RGB_COLORS,
            );
            SelectObject(hdc_mem, old);
            let _ = DeleteObject(HGDIOBJ(hbmp.0));
            let _ = DeleteDC(hdc_mem);
            ReleaseDC(hwnd, hdc_window);

            if copied == 0 {
                return Err("GetDIBits failed".to_string());
            }

            let bmp = encode_bmp_bgra(width, height, &pixels);
            Ok(CaptureResult {
                hwnd: hwnd_str,
                mime: "image/bmp".to_string(),
                data_base64: base64::engine::general_purpose::STANDARD.encode(bmp),
                width,
                height,
            })
        }
    }

    fn send_mouse(flags: windows::Win32::UI::Input::KeyboardAndMouse::MOUSE_EVENT_FLAGS, x: i32, y: i32) {
        let input = INPUT {
            r#type: INPUT_MOUSE,
            Anonymous: INPUT_0 {
                mi: MOUSEINPUT {
                    dx: x,
                    dy: y,
                    mouseData: 0,
                    dwFlags: flags,
                    time: 0,
                    dwExtraInfo: 0,
                },
            },
        };
        unsafe {
            let _ = SendInput(&[input], size_of::<INPUT>() as i32);
        }
        let _ = input;
    }

    pub fn click_client(
        hwnd_str: String,
        x: i32,
        y: i32,
        bring_to_front: bool,
    ) -> Result<(), String> {
        let hwnd = parse_hwnd(&hwnd_str)?;
        if unsafe { !IsWindow(hwnd).as_bool() } {
            return Err("Target window is no longer valid".to_string());
        }
        if bring_to_front {
            unsafe {
                if IsIconic(hwnd).as_bool() {
                    let _ = ShowWindow(hwnd, SW_RESTORE);
                }
                let _ = SetForegroundWindow(hwnd);
            }
            std::thread::sleep(std::time::Duration::from_millis(40));
        }

        let mut pt = POINT { x, y };
        unsafe {
            if !ClientToScreen(hwnd, &mut pt).as_bool() {
                return Err("ClientToScreen failed".to_string());
            }
        }

        let mut old = POINT { x: 0, y: 0 };
        unsafe {
            let _ = GetCursorPos(&mut old);
        }

        let screen_w = unsafe { GetSystemMetrics(SM_CXSCREEN) };
        let screen_h = unsafe { GetSystemMetrics(SM_CYSCREEN) };
        if screen_w <= 0 || screen_h <= 0 {
            return Err("Invalid screen metrics".to_string());
        }
        let abs_x = (pt.x as i64 * 65535) / (screen_w as i64 - 1).max(1);
        let abs_y = (pt.y as i64 * 65535) / (screen_h as i64 - 1).max(1);

        send_mouse(
            MOUSEEVENTF_MOVE | MOUSEEVENTF_ABSOLUTE,
            abs_x as i32,
            abs_y as i32,
        );
        std::thread::sleep(std::time::Duration::from_millis(15));
        send_mouse(MOUSEEVENTF_LEFTDOWN | MOUSEEVENTF_ABSOLUTE, abs_x as i32, abs_y as i32);
        std::thread::sleep(std::time::Duration::from_millis(20));
        send_mouse(MOUSEEVENTF_LEFTUP | MOUSEEVENTF_ABSOLUTE, abs_x as i32, abs_y as i32);

        let old_abs_x = (old.x as i64 * 65535) / (screen_w as i64 - 1).max(1);
        let old_abs_y = (old.y as i64 * 65535) / (screen_h as i64 - 1).max(1);
        std::thread::sleep(std::time::Duration::from_millis(10));
        send_mouse(
            MOUSEEVENTF_MOVE | MOUSEEVENTF_ABSOLUTE,
            old_abs_x as i32,
            old_abs_y as i32,
        );

        Ok(())
    }

    pub fn client_to_screen_pt(hwnd_str: String, x: i32, y: i32) -> Result<ScreenPoint, String> {
        let hwnd = parse_hwnd(&hwnd_str)?;
        let mut pt = POINT { x, y };
        unsafe {
            if !ClientToScreen(hwnd, &mut pt).as_bool() {
                return Err("ClientToScreen failed".to_string());
            }
        }
        Ok(ScreenPoint { x: pt.x, y: pt.y })
    }

    pub fn is_window_valid(hwnd_str: String) -> Result<bool, String> {
        let hwnd = parse_hwnd(&hwnd_str)?;
        Ok(unsafe { IsWindow(hwnd).as_bool() })
    }

    pub fn is_ctrl_down() -> Result<bool, String> {
        let state = unsafe { GetAsyncKeyState(VK_CONTROL.0 as i32) };
        Ok((state as u16 & 0x8000) != 0)
    }
}

#[tauri::command]
pub fn lianxian_cursor_window_info() -> Result<WindowHit, String> {
    platform::cursor_window_info()
}

#[tauri::command]
pub fn lianxian_find_window(
    class_name: String,
    client_width: i32,
    client_height: i32,
    title_includes: Option<String>,
    preferred_hwnd: Option<String>,
) -> Result<WindowHit, String> {
    platform::find_window(
        class_name,
        client_width,
        client_height,
        title_includes,
        preferred_hwnd,
    )
}

#[tauri::command]
pub fn lianxian_capture_window(hwnd: String) -> Result<CaptureResult, String> {
    platform::capture_window(hwnd)
}

#[tauri::command]
pub fn lianxian_click(hwnd: String, x: i32, y: i32, bring_to_front: bool) -> Result<(), String> {
    platform::click_client(hwnd, x, y, bring_to_front)
}

#[tauri::command]
pub fn lianxian_client_to_screen(hwnd: String, x: i32, y: i32) -> Result<ScreenPoint, String> {
    #[cfg(windows)]
    {
        platform::client_to_screen_pt(hwnd, x, y)
    }
    #[cfg(not(windows))]
    {
        platform::client_to_screen(hwnd, x, y)
    }
}

#[tauri::command]
pub fn lianxian_is_window_valid(hwnd: String) -> Result<bool, String> {
    platform::is_window_valid(hwnd)
}

#[tauri::command]
pub fn lianxian_is_ctrl_down() -> Result<bool, String> {
    platform::is_ctrl_down()
}
