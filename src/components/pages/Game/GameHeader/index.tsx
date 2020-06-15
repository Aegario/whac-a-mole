import React from 'react'
import { css } from '@emotion/core'
import { Theme } from '@material-ui/core'

import { DifficultySelect } from 'components/pages/Game/GameHeader/DifficultySelect'
import { TimeLeft } from 'components/pages/Game/GameHeader/TimeLeft'
import { TimerInterface } from 'interfaces'

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

const headerWrapperStyles = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 1.5vh;
`

const mainWrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`
//#endregion

interface GameHeaderProps {
  score: number,
  timer: TimerInterface,
  isPlaying: boolean,
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  score,
  timer,
  isPlaying,
}) => (
  <div css={headerWrapperStyles}>
    <TimeLeft
      timeUp={timer.timeUp}
      timeLeft={timer.timeLeft}
    />
    <div css={mainWrapperStyles}>
      <h1 css={mainHeaderStyles}>
        {timer.timeUp ? 'GAME OVER!' : 'Whac-A-Mole!'}
      </h1>
      <h2 css={scoreHeaderStyles}>
        Score: <span css={scoreStyles}>{score}</span>
      </h2>
    </div>
    <DifficultySelect
      isPlaying={isPlaying}
      reset={timer.reset}
      timeUp={timer.timeUp}
    />
  </div>
)
