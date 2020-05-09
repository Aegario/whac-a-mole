import React from 'react'
import { Link } from 'react-router-dom'
import { Routes } from 'constants/routes'
import { css } from '@emotion/core'
import { Theme } from '@material-ui/core'

const navStyles = (theme: Theme) => css`
  width: 100%;
  display: flex;
  font-size: 20px;
  justify-content: center;
  background-color: ${theme.palette.secondary.main};
`

const linkStyles = css`
  padding: 10px 38px;
  cursor: pointer;
  transition: all 0.3s;
  
  &&:hover {
    background-color: rgba(0,0,0,0.1);
  }
`

export const Header: React.FC = () => (
  <nav css={navStyles}>
    <Link css={linkStyles} to={Routes.root}>Game</Link>
    <Link css={linkStyles} to={Routes.top}>Top</Link>
  </nav>
)
