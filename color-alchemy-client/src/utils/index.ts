import { BoardTileData } from '../components/BoardTile/types'

export const COLORS: Record<string, BoardTileData["color"]> = {
  black: [0, 0, 0],
  red: [255, 0, 0],
  blue: [0, 255, 0],
  green: [0, 0, 255],
}

/**
 *
 * @param param0 Color of a tile
 * @returns boolean
 */
export const isBlack = ([r, g, b]: BoardTileData["color"] = COLORS.black) => r === 0 && g === 0 && b === 0

/**
 *
 * @param dimension Dimension to calculate the final color of a tile. Value can either be height or width
 * @param distance Relative distance of a tile based on `dimension`
 * @returns
 */
export const calculateColor = (dimension: number, distance: number) => (value: number) => {
  const factor = (dimension + 1 - distance) / (dimension + 1)
  return value * factor
}

/**
 *
 * @param sourceColor Color of a source tile
 * @param dimension   Dimension to calculate the final color of a tile. Value can either be height or width
 * @param distance    Relative distance of a tile based on dimension
 * @returns
 */
export const getTileColor = (
  sourceColor: BoardTileData["color"],
  dimension: number,
  distance: number
): BoardTileData["color"] => {
  const [r, g, b] = sourceColor
  const colorFn = calculateColor(dimension, distance)
  return [colorFn(r), colorFn(g), colorFn(b)]
}

/**
 *
 * @param color Color of a tile ;
 * @param targetColor Target Color to calculate delta
 * @returns
 */
export const calculateColorDelta = (color: BoardTileData["color"], targetColor: BoardTileData["color"]) => {
  const [r1, g1, b1] = targetColor
  const [r2, g2, b2] = color
  return (
    (1 / 255) *
    (1 / Math.sqrt(3)) *
    Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(b1 - b2, 2) + Math.pow(g1 - g2, 2))
  )
}
/**
 *
 * @param row
 * @param column
 * @param finalWidth
 * @param finalHeight
 * @returns boolean value indicating if a tile position is corner tile
 */
export const isCornerTile = (
  row: number,
  column: number,
  finalWidth: number,
  finalHeight: number
): boolean => {
  /** Upper left corner */
  return (
    (column === 0 && row === 0) ||
    /** Upper right corner */
    (column === finalWidth && row === 0) ||
    /** Lower left corner */
    (row === finalHeight && column === 0) ||
    /** Lower right corner */
    (column === finalWidth && row === finalHeight)
  )
}

/**
 *
 * @param row
 * @param column
 * @param finalWidth
 * @param finalHeight
 * @returns boolean value indicating if a tile is a source tile.
 */
export const isSourceTile = (
  row: number,
  column: number,
  finalWidth: number,
  finalHeight: number
): boolean => {
  return (
    (row > 0 && (column === 0 || column === finalWidth)) ||
    (row === 0 && column > 0) ||
    (row === finalHeight && column > 0)
  )
}

/**
 *
 * @param width : width of the board;
 * @param height : height of the board
 * @returns initialBoardData contains data of the board when no moves are played
 */
export const initBoardData = (width: number, height: number): BoardTileData[][] => {
  const data = []
  const finalWidth = width + 1
  const finalHeight = height + 1
  for (let row = 0; row <= finalHeight; row++) {
    const boardRow: BoardTileData[] = []
    for (let column = 0; column <= finalWidth; column++) {
      if (isCornerTile(row, column, finalWidth, finalHeight)) {
        boardRow.push({
          position: [row, column],
          color: COLORS.black,
          type: 'NONE',
          isClosest: false,
        })
      } else if (isSourceTile(row, column, finalWidth, finalHeight)) {
        boardRow.push({
          position: [row, column],
          color: COLORS.black,
          type: 'SOURCE',
          isClosest: false,
        })
      } else {
        boardRow.push({
          position: [row, column],
          color: COLORS.black,
          type: 'TILE',
          isClosest: false,
        })
      }
    }
    data.push(boardRow)
  }
  return data
}

export const calculateNormalizedColor = ({
  leftSourceColor,
  rightSourceColor,
  topSourceColor,
  bottomSourceColor,
}: Record<string, BoardTileData["color"]>): BoardTileData["color"] => {
  const rColor = leftSourceColor[0] + rightSourceColor[0] + topSourceColor[0] + bottomSourceColor[0]
  const gColor = leftSourceColor[1] + rightSourceColor[1] + topSourceColor[1] + bottomSourceColor[1]
  const bColor = leftSourceColor[2] + rightSourceColor[2] + topSourceColor[2] + bottomSourceColor[2]
  const normalizationFactor = 255 / Math.max(rColor, gColor, bColor, 255)
  return [
    Math.round(rColor * normalizationFactor),
    Math.round(gColor * normalizationFactor),
    Math.round(bColor * normalizationFactor),
  ]
}

export const findClosestColorTile = (target: BoardTileData["color"], boardData: BoardTileData[][]) => {
  let leastDelta = 1
  let tile: BoardTileData = {
    position: [0, 0],
    color: COLORS.black,
    type: 'NONE',
  }
  boardData.forEach((row: BoardTileData[], i: number) => {
    if (i > 0 && i < boardData.length) {
      row.forEach((_item: BoardTileData, j: number) => {
        if (j > 0 && j < row.length - 1) {
          const delta = calculateColorDelta(boardData[i][j].color, target)
          if (delta < leastDelta) {
            tile = { ...boardData[i][j] }
            leastDelta = delta
          }
        }
      })
    }
  })
  return tile
}
