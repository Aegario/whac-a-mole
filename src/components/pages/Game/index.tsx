import React, { useEffect, useState } from 'react'
import { css } from '@emotion/core'
import { Theme } from '@material-ui/core'

import { RootContainer } from 'components/common/RootContainer'
import { Container } from 'components/common/Container'
import { Header } from 'components/common/Header'
import { Button } from 'components/common/Button'
import { DifficultySelect } from 'components/pages/Game/DifficultySelect'
import { Board } from 'components/pages/Game/Board'
import { TimeLeft } from 'components/pages/Game/TimeLeft'
import { useTimer } from 'hooks/useTimer'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'interfaces'
import { scoreReset } from 'ducks/modules/score'

//#region Styles
const mainHeaderStyles = css`
  font-size: 64px;
`

const scoreHeaderStyles = css`
  font-size: 54px;
  position: relative;
`

const scoreStyles = (theme: Theme) => css`
  margin-left: 22px;
  display: inline-block;
  box-sizing: border-box;
  width: 84px;
  text-align: center;
  border-radius: 5px;
  background-color: ${theme.palette.primary.light};
`

const buttonStyles = (theme: Theme) => css`
  width: 210px;
  height: 64px;
  
  && {
    font-family: 'Permanent Marker', cursive;
    color: ${theme.palette.common.black};
    font-size: 22px;
    letter-spacing: 6px;
    margin-top: 104px;
  }
  
  &&:disabled {
    color: #7e7d7d;
  }
`

const headerWrapperStyles = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 28px;
`

const mainWrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`
//#endregion

export const Game: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const score = useSelector<State, number>(state => state.score)
  const dispatch = useDispatch()
  const timer = useTimer(1)

  const startGame = () => {
    setIsPlaying(true)
    dispatch(scoreReset())
    timer.start()
  }

  useEffect(() => {
    if (timer.timeUp) {
      setIsPlaying(false)

      //and submit the score
    }
  }, [timer.timeUp])

  return (
    <RootContainer>
      <Header />
      <Container>
        <div css={headerWrapperStyles}>
          <TimeLeft
            timeUp={timer.timeUp}
            timeLeft={timer.timeLeft}
          />
          <div css={mainWrapperStyles}>
            <h1 css={mainHeaderStyles}>{timer.timeUp ? 'GAME OVER!' : 'Whac-A-Mole!'}</h1>
            <h2 css={scoreHeaderStyles}>Score: <span css={scoreStyles}>{score}</span></h2>
          </div>
          <DifficultySelect
            isPlaying={isPlaying}
            reset={timer.reset}
            timeUp={timer.timeUp}
          />
        </div>

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
