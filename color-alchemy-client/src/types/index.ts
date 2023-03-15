export interface UserGameInfo {
    userId: string
    width: number
    height: number
    maxMoves: number
    target: [number, number, number]
  }
  
export interface UseInitUserGameInfo {
    userGameInfo: UserGameInfo
    movesLeft: number
    gameInitStatus: 'pending' | 'idle' | 'rejected' | 'resolved'
    decrementMovesLeft: () => void
    resetGame: (userId?: string) => void
  }