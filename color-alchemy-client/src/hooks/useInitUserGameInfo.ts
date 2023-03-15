import React from 'react'
import { UserGameInfo, UseInitUserGameInfo } from '../types'

const baseUrl = 'http://localhost:9876/init'
const getApiUrl = (userId?: string) => {
  if (userId) return `${baseUrl}/user/${userId}`
  return baseUrl
}

export const useInitUserGameInfo = () => {
  const [userGameInfo, setUserGameInfo] = React.useState<UserGameInfo>({} as UserGameInfo)
  const [gameInitStatus, setGameInitStatus] =
    React.useState<UseInitUserGameInfo['gameInitStatus']>('idle')
  const [movesLeft, setMovesLeft] = React.useState<number>(-1)
  const decrementMovesLeft = React.useCallback(() => setMovesLeft((moves) => moves - 1), [])
  const fetchUserGameInfo = React.useCallback(async (userId?: string) => {
    setGameInitStatus('pending')
    const url = getApiUrl(userId)
    try {
      const response = await fetch(url)
      const jsonData = await response.json()
      setGameInitStatus('resolved')
      setUserGameInfo(jsonData)
    } catch (error: any) {
      setGameInitStatus('rejected')
      console.error('Error encountered while initializing the game', error)
    }
  }, [])

  const resetGame = React.useCallback(
    (userId?: string) => {
      setMovesLeft(-1)
      fetchUserGameInfo(userId)
    },
    [fetchUserGameInfo]
  )

  React.useEffect(() => {
    setMovesLeft(() => userGameInfo.maxMoves)
  }, [userGameInfo?.maxMoves])

  React.useEffect(() => {
    setMovesLeft((moves) => (moves && moves !== -1 ? moves - 1 : userGameInfo.maxMoves))
  }, [userGameInfo.maxMoves])

  React.useEffect(() => {
    fetchUserGameInfo()
  }, [fetchUserGameInfo])

  return {
    userGameInfo,
    movesLeft,
    gameInitStatus,
    decrementMovesLeft,
    resetGame,
  } as const
}
