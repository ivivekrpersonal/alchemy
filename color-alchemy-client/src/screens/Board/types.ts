import { BoardTileData } from "../../components/BoardTile/types"

export interface BoardProps {
    data: BoardTileData[][]
    onMovePlayed: (arg: BoardTileData[][]) => void
}