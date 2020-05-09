import React from 'react'
import { css } from '@emotion/core'
import dirt from 'assets/dirt.svg'
import mole from 'assets/mole.svg'

//#region Styles
const gameBoardStyles = css`
  display: flex;
  flex-wrap: wrap;
  height: 400px;
  width: 600px;
`

const holeStyles = css`
  flex: 1 0 33.3%;
  position: relative;
  overflow: hidden;
  
  &&::after {
     display: flex;
     background: url(${dirt}) bottom center no-repeat;
     background-size: contain;
     content: '';
     width: 100%;
     height: 70px;
     position: absolute;
     z-index: 2;
     bottom: -32px;
  }
`

const moleStyles = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 100%;
  background: url(${mole}) bottom center no-repeat;
  background-size: 60%;
  transition: all 0.2s;
`

//#endregion

export const Board = () => {
  return (
    <div css={gameBoardStyles}>
      {Array(6).fill('').map((_next, i) => (
        <div key={i} css={holeStyles}>
          <div css={moleStyles} />
        </div>
      ))}
    </div>
  )
}
