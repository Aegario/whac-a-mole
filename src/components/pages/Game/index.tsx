import React, { useEffect, useState } from 'react'
import { css } from '@emotion/core'
import { Theme } from '@material-ui/core'

import { RootContainer } from 'components/common/RootContainer'
import { Container } from 'components/common/Container'
import { Header } from 'components/common/Header'
import { Button } from 'components/common/Button'
import { Board } from 'components/pages/Game/Board'
import { useTimer } from 'hooks/useTimer'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'interfaces'
import { scoreReset } from 'ducks/modules/game/score'
import { postScore } from 'ducks/modules/game'
import { GameHeader } from 'components/pages/Game/GameHeader'

//#region Styles
const buttonStyles = (theme: Theme) => css`
  width: 210px;
  height: 64px;
  
  && {
    font-family: 'Permanent Marker', cursive;
    color: ${theme.palette.common.black};
    font-size: 22px;
    letter-spacing: 6px;
    margin-top: 8vh;
  }
  
  &&:disabled {
    color: #7e7d7d;
  }
`
//#endregion

export const Game: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const score = useSelector<State, number>(state => state.game.score)
  const dispatch = useDispatch()
  const timer = useTimer(15)

  const startGame = () => {
    setIsPlaying(true)
    dispatch(scoreReset())
    timer.start()
  }

  useEffect(() => {
    if (timer.timeUp) {
      setIsPlaying(false)


      dispatch(postScore())
    }
  }, [dispatch, timer.timeUp])

  return (
    <RootContainer>
      <Header />
      <Container>
        <GameHeader
          score={score}
          timer={timer}
          isPlaying={isPlaying}
        />

        <Board isPlaying={isPlaying} />

        <Button
          css={buttonStyles}
          onClick={startGame}
          disabled={isPlaying}
        >
          Start!
        </Button>
      </Container>
    </RootContainer>
  )
}
