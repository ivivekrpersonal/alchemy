import { TileShape } from '../BoardTile/styled'
import { ToolTip } from '../ToolTip'
import { InfoItem } from './styled'
import { GameInfoProps } from './types'

export const GameInfo: React.FunctionComponent<GameInfoProps> = ({
  userId,
  movesLeft,
  target,
  closestColor,
  delta,
}) => (
  <div>
    <h4>RGB Color Alchemy</h4>
    <InfoItem>User Id: {userId}</InfoItem>
    <InfoItem>Moves Left: {movesLeft}</InfoItem>
    <InfoItem>
      <div>Target Color:</div>
      <ToolTip content={`${target.toString()}`}>
        <TileShape $color={target} $type="TILE" />
      </ToolTip>
    </InfoItem>
    <InfoItem>
      <div>Closest Color:</div>
      <ToolTip content={`${closestColor.toString()}`}>
        <TileShape $color={closestColor} $type="TILE" />
      </ToolTip>
      <span> &Delta;={delta}</span>
    </InfoItem>
  </div>
)
