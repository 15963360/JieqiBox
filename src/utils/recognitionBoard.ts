import { LABELS, type DetectionBox } from '@/composables/image-recognition/types'
import { FEN_MAP, INITIAL_PIECE_COUNTS } from '@/utils/constants'
import type { LianxianPoint, LianxianScheme, OccupancyCell } from '@/types/lianxian'

export const convertDetectionToPieceName = (
  detection: DetectionBox
): string | null => {
  const label = LABELS[detection.labelIndex]
  if (!label) return null

  const labelName = label.name

  if (labelName === 'r_general') return 'red_king'
  if (labelName === 'r_advisor') return 'red_advisor'
  if (labelName === 'r_elephant') return 'red_elephant'
  if (labelName === 'r_horse') return 'red_horse'
  if (labelName === 'r_chariot') return 'red_chariot'
  if (labelName === 'r_cannon') return 'red_cannon'
  if (labelName === 'r_soldier') return 'red_pawn'

  if (labelName === 'b_general') return 'black_king'
  if (labelName === 'b_advisor') return 'black_advisor'
  if (labelName === 'b_elephant') return 'black_elephant'
  if (labelName === 'b_horse') return 'black_horse'
  if (labelName === 'b_chariot') return 'black_chariot'
  if (labelName === 'b_cannon') return 'black_cannon'
  if (labelName === 'b_soldier') return 'black_pawn'

  if (labelName.startsWith('dark_')) {
    const baseName = labelName.substring(5)
    if (baseName.startsWith('r_')) return 'red_unknown'
    if (baseName.startsWith('b_')) return 'black_unknown'
  }

    if (labelName === 'dark') return 'unknown'

  return null
}

export const occupancyTokenFromPieceName = (
  pieceName: string | null,
  isKnown = true
): string | null => {
  if (!pieceName) return null
  if (!isKnown || pieceName.includes('unknown')) {
    if (pieceName.startsWith('black')) return 'x'
    if (pieceName.startsWith('red')) return 'X'
    return 'X'
  }
  return FEN_MAP[pieceName] || null
}

export const mapBoxesToCalibratedGrid = (
  boxes: DetectionBox[],
  scheme: Pick<LianxianScheme, 'topLeft' | 'bottomRight'>
): OccupancyCell[][] => {
  const grid: OccupancyCell[][] = Array.from({ length: 10 }, () =>
    Array(9).fill(null)
  )
  const dx = scheme.bottomRight.x - scheme.topLeft.x
  const dy = scheme.bottomRight.y - scheme.topLeft.y
  if (Math.abs(dx) < 8 || Math.abs(dy) < 8) return grid

  for (const box of boxes) {
    const label = LABELS[box.labelIndex]
    if (!label || label.name === 'Board') continue
    let pieceName = convertDetectionToPieceName(box)
    if (!pieceName) continue

    const cx = box.box[0] + box.box[2] / 2
    const cy = box.box[1] + box.box[3] / 2
    const col = Math.round(((cx - scheme.topLeft.x) / dx) * 8)
    const row = Math.round(((cy - scheme.topLeft.y) / dy) * 9)
    if (row < 0 || row > 9 || col < 0 || col > 8) continue

    const isKnown = pieceName !== 'unknown' && !pieceName.includes('unknown')
    const token = occupancyTokenFromPieceName(pieceName, isKnown)
    if (!token) continue
    const current = grid[row][col]
    if (!current || box.score > current.score) {
      grid[row][col] = { token, pieceName, isKnown, score: box.score }
    }
  }
  return grid
}

export const visualToInternal = (
  row: number,
  col: number,
  redOnTop: boolean
): { row: number; col: number } => {
  if (!redOnTop) return { row, col }
  return { row: 9 - row, col: 8 - col }
}

export const internalToVisual = (
  row: number,
  col: number,
  redOnTop: boolean
): { row: number; col: number } => visualToInternal(row, col, redOnTop)

export const gridToInternalOccupancy = (
  visualGrid: OccupancyCell[][],
  redOnTop: boolean
): OccupancyCell[][] => {
  const out: OccupancyCell[][] = Array.from({ length: 10 }, () =>
    Array(9).fill(null)
  )
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 9; c++) {
      const mapped = visualToInternal(r, c, redOnTop)
      const cell = visualGrid[r][c]
      if (cell && (cell.pieceName === 'unknown' || cell.token === 'X' || cell.token === 'x')) {
        const isRed = mapped.row >= 5
        out[mapped.row][mapped.col] = {
          ...cell,
          pieceName: isRed ? 'red_unknown' : 'black_unknown',
          isKnown: false,
          token: isRed ? 'X' : 'x',
        }
      } else {
        out[mapped.row][mapped.col] = cell
      }
    }
  }
  return out
}

export const localPiecesToOccupancy = (
  pieces: Array<{
    name: string
    row: number
    col: number
    isKnown: boolean
  }>,
  isBoardFlipped: boolean
): OccupancyCell[][] => {
  const grid: OccupancyCell[][] = Array.from({ length: 10 }, () =>
    Array(9).fill(null)
  )
  for (const p of pieces) {
    const row = isBoardFlipped ? 9 - p.row : p.row
    const col = isBoardFlipped ? 8 - p.col : p.col
    const token = occupancyTokenFromPieceName(p.name, p.isKnown)
    if (!token) continue
    grid[row][col] = {
      token,
      pieceName: p.name,
      isKnown: p.isKnown,
      score: 1,
    }
  }
  return grid
}

export const occupancyHasKings = (occupancy: OccupancyCell[][]): boolean => {
  let redKing = false
  let blackKing = false
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 9; c++) {
      const token = occupancy[r][c]?.token
      if (token === 'K') redKing = true
      if (token === 'k') blackKing = true
    }
  }
  return redKing && blackKing
}

export const occupancyEquals = (
  a: OccupancyCell[][],
  b: OccupancyCell[][]
): boolean => {
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 9; c++) {
      if ((a[r][c]?.token || '.') !== (b[r][c]?.token || '.')) return false
    }
  }
  return true
}

export const rcToUci = (row: number, col: number): string =>
  `${String.fromCharCode(97 + col)}${9 - row}`

export const inferMoveFromOccupancy = (
  before: OccupancyCell[][],
  after: OccupancyCell[][]
): { uci: string; from: { row: number; col: number }; to: { row: number; col: number } } | null => {
  const froms: Array<{ row: number; col: number }> = []
  const tos: Array<{ row: number; col: number }> = []

  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 9; c++) {
      const a = before[r][c]?.token || '.'
      const b = after[r][c]?.token || '.'
      if (a === b) continue
      if (a !== '.' && b === '.') froms.push({ row: r, col: c })
      else if (b !== '.' && a !== b) {
        tos.push({ row: r, col: c })
        if (a !== '.') {
          // capture/reveal on the destination — origin is still the emptied square
        }
      }
    }
  }

  if (froms.length === 1 && tos.length === 1) {
    const from = froms[0]
    const to = tos[0]
    return {
      uci: `${rcToUci(from.row, from.col)}${rcToUci(to.row, to.col)}`,
      from,
      to,
    }
  }
  return null
}

export const occupancyToFen = (
  occupancy: OccupancyCell[][],
  sideToMove: 'red' | 'black'
): string => {
  const rows: string[] = []
  for (let r = 0; r < 10; r++) {
    let empty = 0
    let str = ''
    for (let c = 0; c < 9; c++) {
      const token = occupancy[r][c]?.token
      if (!token) {
        empty++
      } else {
        if (empty > 0) {
          str += empty
          empty = 0
        }
        str += token
      }
    }
    if (empty > 0) str += empty
    rows.push(str)
  }

  const knownCounts: Record<string, number> = {}
  let darkRed = 0
  let darkBlack = 0
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = occupancy[r][c]
      if (!cell) continue
      if (cell.token === 'X') darkRed++
      else if (cell.token === 'x') darkBlack++
      else knownCounts[cell.token] = (knownCounts[cell.token] || 0) + 1
    }
  }

  const hiddenCounts: Record<string, number> = {}
  for (const [char, maxCount] of Object.entries(INITIAL_PIECE_COUNTS)) {
    const remaining = Math.max(0, maxCount - (knownCounts[char] || 0))
    if (remaining > 0) hiddenCounts[char] = remaining
  }
  if (darkRed === 0) 'RNBAKCP'.split('').forEach(ch => delete hiddenCounts[ch])
  if (darkBlack === 0) 'rnbakcp'.split('').forEach(ch => delete hiddenCounts[ch])

  let hiddenStr = ''
  'RNBAKCP'.split('').forEach(char => {
    const redCount = hiddenCounts[char] || 0
    const blackCount = hiddenCounts[char.toLowerCase()] || 0
    if (redCount > 0) hiddenStr += char + redCount
    if (blackCount > 0) hiddenStr += char.toLowerCase() + blackCount
  })

  const color = sideToMove === 'red' ? 'w' : 'b'
  const hiddenPart = hiddenStr || '-'
  return `${rows.join('/')} ${color} ${hiddenPart} - 0 1`
}

export const squareCenterClient = (
  scheme: Pick<LianxianScheme, 'topLeft' | 'bottomRight'>,
  visualRow: number,
  visualCol: number
): LianxianPoint => {
  const dx = (scheme.bottomRight.x - scheme.topLeft.x) / 8
  const dy = (scheme.bottomRight.y - scheme.topLeft.y) / 9
  return {
    x: scheme.topLeft.x + dx * visualCol,
    y: scheme.topLeft.y + dy * visualRow,
  }
}
