import React from 'react'
import { css } from '@emotion/core'
import { Theme } from '@material-ui/core'

const headerStyles = css`
  font-size: 32px;
  padding-top: 24px;
`

const spanStyles = (theme: Theme) => css`
  margin-left: 16px;
  display: inline-block;
  width: 52px;
  text-align: center;
  border-radius: 5px;
  background-color: ${theme.palette.primary.light};
`

interface TimeLeftProps { timeLeft: number }

export const TimeLeft: React.FC<TimeLeftProps> = ({ timeLeft }) => (
  <h1 css={headerStyles}>
    Time left:
    <span css={spanStyles}>
      {timeLeft}
    </span>
  </h1>
)
