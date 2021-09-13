export type GridState = {
  tiles: number[][]
  width: number
  height: number
  tileWidth: number
  tileHeight: number
  divisions: number
  scale: number
  visible: boolean
}

export type Layer = {
  title: string
  position: number
  grid: GridState
  type: 'Terrain' | 'Sprite' | 'Parallax'
  locked: boolean
  visible: boolean
}
