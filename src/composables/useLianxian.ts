import { computed, inject, ref, watch } from 'vue'
import { invoke } from '@tauri-apps/api/core'
import { useI18n } from 'vue-i18n'
import { useImageRecognition } from './image-recognition'
import { useLianxianSchemes } from './useLianxianSchemes'
import { useConfigManager } from './useConfigManager'
import type {
  LianxianCaptureResult,
  LianxianPhase,
  LianxianScheme,
  LianxianWindowHit,
  OccupancyCell,
} from '@/types/lianxian'
import {
  gridToInternalOccupancy,
  inferMoveFromOccupancy,
  internalToVisual,
  localPiecesToOccupancy,
  mapBoxesToCalibratedGrid,
  occupancyEquals,
  occupancyHasKings,
  occupancyToFen,
  squareCenterClient,
} from '@/utils/recognitionBoard'
import { isWindowsDesktop } from '@/utils/platform'

const isLinking = ref(false)
const isCalibrating = ref(false)
const calibrationStep = ref<0 | 1 | 2>(0)
const phase = ref<LianxianPhase>('idle')
const statusMessage = ref('')
const lastError = ref('')
const activeSchemeId = ref('')
const linkedWindowTitle = ref('')
const linkedHwnd = ref('')
const pendingDraft = ref<Partial<LianxianScheme> | null>(null)

let pollTimer: number | null = null
let calibTimer: number | null = null
let ctrlWasDown = false
let tickBusy = false
let firstSyncDone = false
let lastPlayedEngineMove = ''
let lastClickedUci = ''
let consecutiveDesync = 0
let ignoreRemoteUntil = 0
let engineWatchInstalled = false
let recognitionSingleton: ReturnType<typeof useImageRecognition> | null = null

const getRecognition = () => {
  if (!recognitionSingleton) {
    recognitionSingleton = useImageRecognition()
  }
  return recognitionSingleton
}

export function useLianxian() {
  const { t } = useI18n()
  const gameState: any =
    inject('game-state', null) || (window as any).__GAME_STATE__
  const engineState: any =
    inject('engine-state', null) || (window as any).__ENGINE_STATE__
  const schemesApi = useLianxianSchemes()
  const recognition = getRecognition()
  const configManager = useConfigManager()

  const activeScheme = computed(() =>
    schemesApi.getScheme(activeSchemeId.value)
  )
  const unsupported = computed(() => !isWindowsDesktop())

  const stopTimers = () => {
    if (pollTimer !== null) {
      window.clearTimeout(pollTimer)
      pollTimer = null
    }
    if (calibTimer !== null) {
      window.clearInterval(calibTimer)
      calibTimer = null
    }
  }

  const setPhase = (next: LianxianPhase, message = '') => {
    phase.value = next
    if (message) statusMessage.value = message
  }

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const captureSchemeWindow = async (
    scheme: LianxianScheme
  ): Promise<{ hit: LianxianWindowHit; capture: LianxianCaptureResult }> => {
    const hit = await invoke<LianxianWindowHit>('lianxian_find_window', {
      className: scheme.className,
      clientWidth: scheme.clientWidth,
      clientHeight: scheme.clientHeight,
      titleIncludes: scheme.titleIncludes || null,
      preferredHwnd: linkedHwnd.value || null,
    })
    if (
      Math.abs(hit.clientWidth - scheme.clientWidth) > 16 ||
      Math.abs(hit.clientHeight - scheme.clientHeight) > 16
    ) {
      throw new Error(t('lianxian.windowSizeMismatch'))
    }
    linkedHwnd.value = hit.hwnd
    linkedWindowTitle.value = hit.title
    const capture = await invoke<LianxianCaptureResult>(
      'lianxian_capture_window',
      { hwnd: hit.hwnd }
    )
    return { hit, capture }
  }

  const recognizeCapture = async (capture: LianxianCaptureResult) => {
    const dataUrl = `data:${capture.mime};base64,${capture.dataBase64}`
    return recognition.processDataUrl(dataUrl)
  }

  const currentLocalOccupancy = (): OccupancyCell[][] =>
    localPiecesToOccupancy(
      gameState.pieces.value,
      !!gameState.isBoardFlipped?.value
    )

  const playRemoteMove = async (uci: string) => {
    ;(window as any).__LIANXIAN_APPLYING__ = true
    try {
      const ok = gameState.playMoveFromUci(uci)
      if (ok && gameState.pendingFlip?.value) {
        const pending = gameState.pendingFlip.value
        const pool = Object.entries(gameState.unrevealedPieceCounts.value || {})
          .filter(([, count]) => (count as number) > 0)
          .map(([char]) => gameState.getPieceNameFromChar(char))
          .filter((name: string) => name.startsWith(pending.side))
        if (pool.length > 0) pending.callback(pool[0])
      }
      return ok
    } finally {
      ;(window as any).__LIANXIAN_APPLYING__ = false
    }
  }

  const clickUciOnRemote = async (scheme: LianxianScheme, uci: string) => {
    if (uci.length < 4) return
    const file2col = (c: string) => c.charCodeAt(0) - 'a'.charCodeAt(0)
    const rank2row = (d: string) => 9 - parseInt(d, 10)
    const from = { col: file2col(uci[0]), row: rank2row(uci[1]) }
    const to = { col: file2col(uci[2]), row: rank2row(uci[3]) }
    const fromVis = internalToVisual(from.row, from.col, scheme.redOnTop)
    const toVis = internalToVisual(to.row, to.col, scheme.redOnTop)
    const fromPt = squareCenterClient(scheme, fromVis.row, fromVis.col)
    const toPt = squareCenterClient(scheme, toVis.row, toVis.col)
    setPhase('clicking', t('lianxian.statusClicking', { move: uci }))
    await invoke('lianxian_click', {
      hwnd: linkedHwnd.value,
      x: Math.round(fromPt.x),
      y: Math.round(fromPt.y),
      bringToFront: true,
    })
    await sleep(scheme.clickDelayMs || 80)
    await invoke('lianxian_click', {
      hwnd: linkedHwnd.value,
      x: Math.round(toPt.x),
      y: Math.round(toPt.y),
      bringToFront: false,
    })
    lastClickedUci = uci
    ignoreRemoteUntil = Date.now() + Math.max(600, (scheme.pollIntervalMs || 400) * 2)
  }

  const maybeStartEngine = async (scheme: LianxianScheme) => {
    if (!engineState?.isEngineLoaded?.value) {
      setPhase('watching', t('lianxian.needEngine'))
      return
    }
    if (engineState.isThinking?.value) return
    if (gameState.pendingFlip?.value) return
    if (gameState.sideToMove.value !== scheme.ourSide) return
    lastPlayedEngineMove = ''
    setPhase('thinking', t('lianxian.statusThinking'))
    const settings = configManager.getAnalysisSettings()
    engineState.startAnalysis(settings, [], null, [])
  }

  const applyFullSync = (occupancy: OccupancyCell[][]) => {
    const fen = occupancyToFen(occupancy, gameState.sideToMove.value)
    gameState.confirmFenInput(fen)
    firstSyncDone = true
    consecutiveDesync = 0
    window.dispatchEvent(
      new CustomEvent('force-stop-ai', { detail: { reason: 'lianxian-sync' } })
    )
  }

  const tick = async () => {
    if (!isLinking.value || tickBusy) return
    const scheme = activeScheme.value
    if (!scheme) {
      await disconnect()
      return
    }
    tickBusy = true
    try {
      const { capture } = await captureSchemeWindow(scheme)
      const boxes = await recognizeCapture(capture)
      const visualGrid = mapBoxesToCalibratedGrid(boxes, scheme)
      const occupancy = gridToInternalOccupancy(visualGrid, scheme.redOnTop)
      const local = currentLocalOccupancy()
      if (!occupancyHasKings(occupancy)) {
        setPhase('watching', t('lianxian.statusUnstable'))
        return
      }

      if (Date.now() < ignoreRemoteUntil) {
        if (occupancyEquals(occupancy, local)) {
          ignoreRemoteUntil = 0
          consecutiveDesync = 0
        }
        setPhase('watching', t('lianxian.statusWatching'))
        return
      }

      if (!firstSyncDone) {
        setPhase('syncing', t('lianxian.statusSyncing'))
        applyFullSync(occupancy)
        setPhase('watching', t('lianxian.statusWatching'))
        await maybeStartEngine(scheme)
        return
      }

      if (occupancyEquals(occupancy, local)) {
        consecutiveDesync = 0
        if (gameState.sideToMove.value === scheme.ourSide) {
          await maybeStartEngine(scheme)
        } else {
          setPhase('watching', t('lianxian.statusWatching'))
        }
        return
      }

      const inferred = inferMoveFromOccupancy(local, occupancy)
      if (
        inferred &&
        gameState.sideToMove.value !== scheme.ourSide &&
        inferred.uci !== lastClickedUci
      ) {
        const ok = await playRemoteMove(inferred.uci)
        if (ok) {
          consecutiveDesync = 0
          setPhase('watching', t('lianxian.statusOpponentMoved', { move: inferred.uci }))
          await maybeStartEngine(scheme)
          return
        }
      }

      if (inferred && inferred.uci === lastClickedUci) {
        consecutiveDesync = 0
        return
      }

      consecutiveDesync += 1
      if (consecutiveDesync >= 3) {
        applyFullSync(occupancy)
        setPhase('syncing', t('lianxian.statusResynced'))
        await maybeStartEngine(scheme)
      } else {
        setPhase('watching', t('lianxian.statusUnstable'))
      }
    } catch (error) {
      lastError.value =
        error instanceof Error ? error.message : String(error)
      setPhase('error', lastError.value)
    } finally {
      tickBusy = false
      if (isLinking.value) {
        const delay = Math.max(200, activeScheme.value?.pollIntervalMs || 400)
        pollTimer = window.setTimeout(() => {
          void tick()
        }, delay)
      }
    }
  }

  const playEngineMove = async (move: string) => {
    if (!isLinking.value || !move) return
    const scheme = activeScheme.value
    if (!scheme) return
    if (gameState.sideToMove.value !== scheme.ourSide) return
    if (move === lastPlayedEngineMove) return
    const trimmed = move.trim()
    if (trimmed === '(none)' || trimmed === 'none') return
    lastPlayedEngineMove = trimmed
    if (engineState?.bestMove) engineState.bestMove.value = ''
    const ok = await playRemoteMove(trimmed)
    if (!ok) return
    try {
      await clickUciOnRemote(scheme, trimmed.substring(0, 4))
      setPhase('watching', t('lianxian.statusPlayed', { move: trimmed }))
    } catch (error) {
      lastError.value =
        error instanceof Error ? error.message : String(error)
      setPhase('error', lastError.value)
    }
  }

  if (!engineWatchInstalled) {
    engineWatchInstalled = true
    watch(
      () => engineState?.bestMove?.value,
      move => {
        if (!isLinking.value || !move) return
        void playEngineMove(move)
      }
    )
  }

  const startCalibration = () => {
    if (unsupported.value) {
      lastError.value = t('lianxian.windowsOnly')
      setPhase('error', lastError.value)
      return
    }
    stopTimers()
    pendingDraft.value = {}
    isCalibrating.value = true
    calibrationStep.value = 1
    ctrlWasDown = false
    setPhase('calibrating', t('lianxian.calibrateTopLeft'))
    calibTimer = window.setInterval(() => {
      void pollCalibration()
    }, 80)
  }

  const cancelCalibration = () => {
    isCalibrating.value = false
    calibrationStep.value = 0
    pendingDraft.value = null
    if (calibTimer !== null) {
      window.clearInterval(calibTimer)
      calibTimer = null
    }
    if (!isLinking.value) setPhase('idle', '')
  }

  const pollCalibration = async () => {
    if (!isCalibrating.value) return
    try {
      const down = await invoke<boolean>('lianxian_is_ctrl_down')
      if (down && !ctrlWasDown) {
        const hit = await invoke<LianxianWindowHit>(
          'lianxian_cursor_window_info'
        )
        if (calibrationStep.value === 1) {
          pendingDraft.value = {
            className: hit.className,
            parentClassName: hit.parentClassName,
            titleIncludes: '',
            clientWidth: hit.clientWidth,
            clientHeight: hit.clientHeight,
            topLeft: { x: hit.cursorClientX, y: hit.cursorClientY },
          }
          calibrationStep.value = 2
          setPhase('calibrating', t('lianxian.calibrateBottomRight'))
        } else if (calibrationStep.value === 2) {
          const draft = pendingDraft.value || {}
          if (
            draft.className &&
            draft.className !== hit.className
          ) {
            lastError.value = t('lianxian.windowChanged')
            setPhase('error', lastError.value)
            return
          }
          pendingDraft.value = {
            ...draft,
            clientWidth: hit.clientWidth,
            clientHeight: hit.clientHeight,
            bottomRight: { x: hit.cursorClientX, y: hit.cursorClientY },
          }
          isCalibrating.value = false
          calibrationStep.value = 0
          if (calibTimer !== null) {
            window.clearInterval(calibTimer)
            calibTimer = null
          }
          setPhase('idle', t('lianxian.calibrateDone'))
          window.dispatchEvent(
            new CustomEvent('lianxian-calibration-complete', {
              detail: pendingDraft.value,
            })
          )
        }
      }
      ctrlWasDown = down
    } catch (error) {
      lastError.value =
        error instanceof Error ? error.message : String(error)
      setPhase('error', lastError.value)
    }
  }

  const connect = async (schemeId?: string) => {
    if (unsupported.value) {
      lastError.value = t('lianxian.windowsOnly')
      setPhase('error', lastError.value)
      throw new Error(lastError.value)
    }
    const id = schemeId || schemesApi.defaultSchemeId.value
    const scheme = schemesApi.getScheme(id)
    if (!scheme) {
      lastError.value = t('lianxian.noScheme')
      setPhase('error', lastError.value)
      throw new Error(lastError.value)
    }
    await disconnect()
    activeSchemeId.value = scheme.id
    isLinking.value = true
    firstSyncDone = false
    consecutiveDesync = 0
    lastPlayedEngineMove = ''
    lastClickedUci = ''
    ignoreRemoteUntil = 0
    lastError.value = ''
    ;(window as any).__LIANXIAN_MODE__ = true
    setPhase('connecting', t('lianxian.statusConnecting', { name: scheme.name }))
    await tick()
  }

  const disconnect = async () => {
    isLinking.value = false
    ;(window as any).__LIANXIAN_MODE__ = false
    stopTimers()
    linkedHwnd.value = ''
    linkedWindowTitle.value = ''
    firstSyncDone = false
    tickBusy = false
    if (phase.value !== 'calibrating') setPhase('idle', t('lianxian.statusDisconnected'))
  }

  const clickExtra = async (index: number) => {
    const scheme = activeScheme.value
    if (!scheme || !linkedHwnd.value) return
    const pt = scheme.extraClicks[index]
    if (!pt) return
    await invoke('lianxian_click', {
      hwnd: linkedHwnd.value,
      x: Math.round(pt.x),
      y: Math.round(pt.y),
      bringToFront: true,
    })
  }

  return {
    isLinking,
    isCalibrating,
    calibrationStep,
    phase,
    statusMessage,
    lastError,
    activeSchemeId,
    activeScheme,
    linkedWindowTitle,
    pendingDraft,
    unsupported,
    schemesApi,
    startCalibration,
    cancelCalibration,
    connect,
    disconnect,
    clickExtra,
    playEngineMove,
  }
}
