export interface LianxianPoint {
  x: number
  y: number
}

export interface LianxianExtraClick {
  id: string
  name: string
  x: number
  y: number
}

export interface LianxianScheme {
  id: string
  name: string
  className: string
  parentClassName: string
  titleIncludes: string
  clientWidth: number
  clientHeight: number
  topLeft: LianxianPoint
  bottomRight: LianxianPoint
  ourSide: 'red' | 'black'
  redOnTop: boolean
  pollIntervalMs: number
  clickDelayMs: number
  extraClicks: LianxianExtraClick[]
  createdAt: number
  updatedAt: number
}

export interface LianxianWindowHit {
  hwnd: string
  title: string
  className: string
  parentClassName: string
  clientWidth: number
  clientHeight: number
  cursorClientX: number
  cursorClientY: number
  screenX: number
  screenY: number
}

export interface LianxianCaptureResult {
  hwnd: string
  mime: string
  dataBase64: string
  width: number
  height: number
}

export type LianxianPhase =
  | 'idle'
  | 'calibrating'
  | 'connecting'
  | 'syncing'
  | 'watching'
  | 'thinking'
  | 'clicking'
  | 'error'

export type OccupancyCell = {
  token: string
  pieceName: string | null
  isKnown: boolean
  score: number
} | null

export const defaultSchemeValues = (): Omit<
  LianxianScheme,
  'id' | 'name' | 'createdAt' | 'updatedAt'
> => ({
  className: '',
  parentClassName: '',
  titleIncludes: '',
  clientWidth: 0,
  clientHeight: 0,
  topLeft: { x: 0, y: 0 },
  bottomRight: { x: 0, y: 0 },
  ourSide: 'red',
  redOnTop: false,
  pollIntervalMs: 400,
  clickDelayMs: 80,
  extraClicks: [],
})
