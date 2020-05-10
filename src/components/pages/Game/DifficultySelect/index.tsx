import React from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { css } from '@emotion/core'

import { DifficultyLevels } from 'constants/difficultyLevels'
import { useDispatch, useSelector } from 'react-redux'
import { selectDifficulty } from 'ducks/modules/difficulty'
import { State } from 'interfaces'

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

interface DifficultySelectProps {
  isPlaying: boolean,
}

export const DifficultySelect: React.FC<DifficultySelectProps> = ({ isPlaying }) => {
  const dispatch = useDispatch()
  const difficulty = useSelector<State, string>(state => state.difficulty)

  return (
    <div css={wrapperStyles}>
      <h1 css={headerStyles}>Select your skill level: </h1>
      <Select
        css={selectStyles}
        value={difficulty}
        onChange={(e) => dispatch(selectDifficulty(e.target.value))}
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
