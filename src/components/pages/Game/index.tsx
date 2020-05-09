import React, { useState } from 'react'
import { css } from '@emotion/core'
import { Theme } from '@material-ui/core'

import { RootContainer } from 'components/common/RootContainer'
import { Container } from 'components/common/Container'
import { Header } from 'components/common/Header'
import { Button } from 'components/common/Button'
import dirt from 'assets/dirt.svg'
import mole from 'assets/mole.svg'
import {DifficultySelect} from 'components/pages/Game/DifficultySelect'
import {Board} from 'components/pages/Game/Board'


//#region Styles
const headerStyles = css`
  font-size: 64px;
  /*padding-top: 32px;*/
`

const scoreHeaderStyles = css`
  font-size: 54px;
  position: relative;
`

const scoreStyles = (theme: Theme) => css`
  margin-left: 22px;
  display: inline-block;
  box-sizing: border-box;
  width: 96px;
  text-align: center;
  border-radius: 5px;
  background-color: ${theme.palette.primary.light};
`

const buttonStyles = (theme: Theme) => css`
  width: 196px;
  height: 48px;
  
  && {
    font-family: 'Permanent Marker', cursive;
    color: ${theme.palette.common.black};
    font-size: 22px;
    letter-spacing: 6px;
    margin-top: 88px;
  }
`

const styles1 = css`
  display: flex;
  position: relative;
  padding-top: 28px;
`

const styles2 = css`
  position: absolute;
  right: -244px; 
  padding-top: 18px;
`

const styles3 = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`
//#endregion

export const Game: React.FC = () => {
  const [num, setNum] = useState<number>(0)
  return (
    <RootContainer>
      <Header />
      <Container>
        <div css={styles1}>
          <div css={styles3}>
            <h1 css={headerStyles}>Whac-A-Mole!</h1>
            <h2 css={scoreHeaderStyles}>Score: <span css={scoreStyles}>{num}</span></h2>
          </div>
          <div css={styles2}>
            <DifficultySelect />
            <p>Timer</p>
          </div>
        </div>

        <Board />

        <Button css={buttonStyles} onClick={() => setNum(num + 1)}>
          Start!
        </Button>
      </Container>
    </RootContainer>
  )
}
