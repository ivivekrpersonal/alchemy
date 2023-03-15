import styled from 'styled-components'
import { BoardTileData } from '../../components/BoardTile/types'
import { HTMLAttributes } from 'react'

interface TileShapeProps extends HTMLAttributes<HTMLDivElement> {
  $color: BoardTileData["color"]
  $type: BoardTileData['type']
  $isClosest?: boolean
}

const setCursor = ({ $type, draggable }: TileShapeProps) => {
  if (draggable) {
    if ($type === 'TILE') return 'grab'
    return 'pointer'
  }
  return 'auto'
}

const setBorder = ({ $isClosest }: TileShapeProps) => `2px solid ${!$isClosest ? '#999' : '#F00'}`
const setBackgroundColor = ({ $color: [r, g, b] }: TileShapeProps) => `rgb(${r}, ${g}, ${b})`
export const TileShape = styled.div<TileShapeProps>`
  width: 30px;
  height: 30px;
  background-color: ${setBackgroundColor};
  margin: 2px;
  display: inline-block;
  border-radius: ${({ $type }) => ($type === 'SOURCE' ? '50px' : '3px')};
  cursor: ${setCursor};
  border: ${setBorder};
  &:hover {
    opacity: 0.8;
  }
  color: white;
`
