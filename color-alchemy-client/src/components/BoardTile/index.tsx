import React from 'react'
import { BoardTileData, BoardTileProps } from './types'
import { TileShape } from './styled'
import { ToolTip } from '../ToolTip'

export const BoardTile = ({
  data,
  handleOnClick,
  handleOnDragStart,
  handleDrop,
  draggable,
}: BoardTileProps): React.ReactElement | null => {
  const { position, color, type, isClosest } = data
  if (type === 'NONE' || !data.color) return null
  const [x, y] = position
  const dragStart =
    (tileData: BoardTileData): React.DragEventHandler<HTMLDivElement> =>
    (_e) => {
      handleOnDragStart(tileData)
    }

  const drop =
    (tileData: BoardTileData): React.DragEventHandler<HTMLDivElement> =>
    (e) => {
      if (tileData.type === 'SOURCE') handleDrop(tileData)
      else e.preventDefault()
    }

  const onClick =
    (tileData: BoardTileData): React.MouseEventHandler<HTMLDivElement> =>
    (e: React.MouseEvent) => {
      if (tileData.type === 'SOURCE' && handleOnClick) {
        handleOnClick(tileData)
      }
      e.preventDefault()
      return
    }

  const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => e.preventDefault()

  return (
    <ToolTip content={`${data.color.toString()}`}>
      <TileShape
        onDragStart={dragStart(data)}
        onDragOver={onDragOver}
        onDrop={drop(data)}
        onClick={onClick(data)}
        key={`${x}${y}`}
        draggable={draggable}
        $type={type}
        $color={color}
        $isClosest={isClosest}
      />
    </ToolTip>
  )
}
