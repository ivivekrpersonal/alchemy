import * as React from 'react'
import { BoardTileData } from '../../components/BoardTile/types'
import { COLORS, isBlack } from '../../utils'
import { BoardTile } from '../../components/BoardTile'
import { BoardProps } from './types'
import { BoardContainer, BoardRow } from './styled'

export const Board: React.FunctionComponent<BoardProps> = ({ onMovePlayed, data: boardData }) => {
  const [draggedColor, setDraggedColor] = React.useState<BoardTileData>()
  const [sourceColors, setSourceColors] = React.useState<BoardTileData['color'][]>([
    COLORS.red,
    COLORS.green,
    COLORS.blue,
  ])

  const handleOnClick = (data: BoardTileData) => {
    const { position } = data
    const [x, y] = position
    if (sourceColors.length === 0 || !isBlack(boardData[x][y].color)) return
    const sourceColorsCopy = [...sourceColors]
    const nextSourceColor = sourceColorsCopy!.shift()
    const boardDataCopy = [...boardData]
    boardDataCopy[x][y].color = nextSourceColor!
    setSourceColors(sourceColorsCopy)
    onMovePlayed(boardDataCopy)
  }

  const handleDrop = (data: BoardTileData) => {
    if (sourceColors.length !== 0) return
    const [toPositionX, toPositonY] = data.position
    const boardDataCopy = [...boardData]
    if (draggedColor) {
      boardDataCopy[toPositionX][toPositonY].color = draggedColor.color
    }
    onMovePlayed(boardDataCopy)
  }

  const handleOnDragStart = (data: BoardTileData) => setDraggedColor(() => ({ ...data }))

  return (
    <BoardContainer>
      {boardData.map((boardRow, i) => {
        return (
          <BoardRow key={i}>
            {boardRow.map((item, j) => {
              return (
                <BoardTile
                  data={item}
                  handleOnDragStart={handleOnDragStart}
                  handleOnClick={handleOnClick}
                  handleDrop={handleDrop}
                  key={item.position.toString()}
                  draggable={sourceColors.length === 0}
                />
              )
            })}
          </BoardRow>
        )
      })}
    </BoardContainer>
  )
}
