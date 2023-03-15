/**
 * type:
 * TILE = Square tile on the board
 * SOURCE = Circular tile on the board
 * NONE = Corners of the board
 */
export type BoardTileData = {
  position: number[]
  color: [r: number, g: number, b: number]
  type: 'TILE' | 'SOURCE' | 'NONE'
  isClosest?: boolean
  delta?: number
}

export type BoardTileProps = {
  data: BoardTileData
  handleOnClick(data: BoardTileData): void
  handleOnDragStart(data: BoardTileData): void
  handleDrop(data: BoardTileData): void
  draggable: boolean
}
