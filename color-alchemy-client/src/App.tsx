import React from 'react'
import GlobalStyle from './globalStyles'
import { Board } from './screens/Board'
import { GameInfo } from './components/GameInfo'
import { useInitUserGameInfo } from './hooks/useInitUserGameInfo'
import { BoardTileData } from './components/BoardTile/types'
import { useBoardData } from './hooks/useBoardData'
import styled from 'styled-components'

const AppContainer = styled.div`
  margin: auto;
  width: fit-content;
`

const App: React.FunctionComponent = () => {
  const { userGameInfo, gameInitStatus, movesLeft, decrementMovesLeft, resetGame } =
    useInitUserGameInfo()
  const { userId, target, width, height } = userGameInfo || {}
  const [boardData, setBoardData, closestColorTile] = useBoardData(
    width,
    height,
    target,
    gameInitStatus
  )

  React.useEffect(() => {
    let popupMessage = null
    if (movesLeft > 0 && closestColorTile.delta && closestColorTile.delta <= 10) {
      popupMessage = 'Success! Do you want to play again?'
    } else if (movesLeft === 0) {
      popupMessage = 'Failure! Do you want to play again ?'
    }
    if (popupMessage) {
      if (window.confirm(popupMessage)) {
        resetGame(userGameInfo.userId)
      } else {
        resetGame()
      }
    }
  }, [closestColorTile.delta, movesLeft, resetGame, userGameInfo.userId])

  const handleMovePlayed = (_boardData: BoardTileData[][]) => {
    setBoardData(_boardData)
    decrementMovesLeft()
  }
  if (!boardData || gameInitStatus === 'pending' || gameInitStatus === 'idle')
    return <h3>Loading RGB Alchemy...</h3>
  if (gameInitStatus === 'rejected') return <h3>Game encountered an error !!</h3>

  return (
    <AppContainer>
      <GlobalStyle />
      <GameInfo
        userId={userId}
        target={target}
        delta={closestColorTile!.delta + '%'}
        movesLeft={movesLeft}
        closestColor={closestColorTile!.color}
      />
      <Board data={boardData} onMovePlayed={handleMovePlayed} />
    </AppContainer>
  )
}

export default App
