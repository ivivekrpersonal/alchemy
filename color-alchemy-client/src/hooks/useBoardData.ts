import React from 'react'
import { BoardTileData } from '../components/BoardTile/types'
import {
  calculateNormalizedColor,
  findClosestColorTile,
  getTileColor,
  initBoardData,
} from '../utils'
import { calculateColorDelta, COLORS } from '../utils/index'

const defaultClosestColorTile: BoardTileData = {
  position: [0, 0],
  delta: 100,
  type: 'TILE',
  color: COLORS.black,
}

export const useBoardData = (
  width: number,
  height: number,
  targetColor: BoardTileData['color'],
  gameInitStatus: string
) => {
  const [boardData, setBoardData] = React.useState<BoardTileData[][]>([])
  const [closestColorTile, setClosestColorTile] =
    React.useState<BoardTileData>(defaultClosestColorTile)
  React.useEffect(() => {
    setBoardData(() => initBoardData(width, height))
    setClosestColorTile(defaultClosestColorTile)
  }, [gameInitStatus, height, width])
  const updateBoardData = React.useCallback(
    (updatedBoardData: BoardTileData[][]) => {
      const updatedBoardDataCopy = [...updatedBoardData]
      updatedBoardDataCopy.forEach((row: BoardTileData[], i: number) => {
        if (i > 0 && i < height + 1) {
          row.forEach((_item: BoardTileData, j: number) => {
            if (j > 0 && j < width + 1) {
              const leftSourceColor = getTileColor(updatedBoardDataCopy[i][0].color, width, j)
              const topSourceColor = getTileColor(updatedBoardDataCopy[0][j].color, height, i)
              const rightSourceColor = getTileColor(
                updatedBoardDataCopy[i][width + 1]?.color,
                width,
                width + 1 - j
              )
              const bottomSourceColor = getTileColor(
                updatedBoardDataCopy[height + 1][j]?.color,
                height,
                height + 1 - i
              )

              updatedBoardDataCopy[i][j].color = calculateNormalizedColor({
                leftSourceColor,
                rightSourceColor,
                topSourceColor,
                bottomSourceColor,
              })

              updatedBoardDataCopy[i][j].delta =
                Math.round(
                  calculateColorDelta(targetColor, updatedBoardDataCopy[i][j].color) * 10000
                ) / 100
              updatedBoardDataCopy[i][j].isClosest = false
            }
          })
        }
      })
      const tile = findClosestColorTile(targetColor, updatedBoardDataCopy)
      const [x, y] = tile.position
      updatedBoardDataCopy[x][y].isClosest = true
      setClosestColorTile(tile)
      setBoardData(updatedBoardDataCopy)
      return updatedBoardDataCopy
    },
    [height, targetColor, width]
  )

  return [boardData, updateBoardData, closestColorTile] as const
}
