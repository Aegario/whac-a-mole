import React, { ChangeEvent } from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/core'

import { DifficultyLevels } from 'constants/difficultyLevels'
import { selectDifficulty } from 'ducks/modules/game/difficulty'
import { scoreReset } from 'ducks/modules/game/score'
import { State } from 'interfaces'

//#region Styles
const wrapperStyles = css`
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const headerStyles = css`
  font-size: 18px;
  padding-bottom: 4px;
`

const selectStyles = css`
  width: 150px;
  font-family: 'Barlow', sans-serif;
`
//#endregion

interface DifficultySelectProps {
  isPlaying: boolean,
  reset: () => void,
  timeUp: boolean,
}

export const DifficultySelect: React.FC<DifficultySelectProps> = ({ isPlaying, reset, timeUp }) => {
  const difficulty = useSelector<State, string>(state => state.game.difficulty)
  const dispatch = useDispatch()

  const handleDifficultyChange = (e: ChangeEvent<{ name?: string; value: any}>) => {
    dispatch(selectDifficulty(e.target.value))

    if (timeUp) {
      dispatch(scoreReset())
      reset()
    }
  }

  return (
    <div css={wrapperStyles}>
      <h1 css={headerStyles}>Select your skill level: </h1>
      <Select
        css={selectStyles}
        value={difficulty}
        onChange={handleDifficultyChange}
        disabled={isPlaying}
        autoWidth
      >
        {Object.keys(DifficultyLevels).map((level, i) => (
          <MenuItem
            value={level}
            key={i}
          >
            {level}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}
