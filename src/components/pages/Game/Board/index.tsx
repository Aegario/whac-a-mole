import React, {
  MouseEvent, useEffect, useRef, useState,
} from 'react'
import { css } from '@emotion/core'
import dirt from 'assets/dirt.svg'
import mole from 'assets/mole.svg'
import { useDispatch, useSelector } from 'react-redux'
import { scoreIncrement } from 'ducks/modules/game/score'
import { DifficultyLevels } from 'constants/difficultyLevels'
import { State } from 'interfaces'

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

const moleStyles = (isActive: boolean = false) => css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: ${isActive ? '0%' : '100%'};
  background: url(${mole}) bottom center no-repeat;
  background-size: 60%;
  transition: all 0.2s;
`
//#endregion

interface BoardProps {
  isPlaying: boolean,
}

export const Board: React.FC<BoardProps> = ({ isPlaying }) => {
  const difficulty = useSelector<State, string>(state => state.game.difficulty)
  const [molesActiveStatus, setMolesActiveStatus] = useState<boolean[]>(
    [false, false, false, false, false, false],
  )
  const dispatch = useDispatch()
  const gameBoardElRef = useRef()
  const timeoutId = useRef<number>()
  const wasAlreadyHitOnce = useRef<boolean>()
  let lastActivatedMoleId: number

  const handleMoleClick = (e: MouseEvent) => {
    if (!e.isTrusted || wasAlreadyHitOnce.current) return
    wasAlreadyHitOnce.current = true

    dispatch(scoreIncrement())
  }

  const getRandomTime = (difficultyLevel: string) => {
    let min
    let max

    switch (difficultyLevel) {
      case DifficultyLevels.BEGINNER:
        min = 800
        max = 1000
        break
      case DifficultyLevels.NORMAL:
        min = 600
        max = 700
        break
      case DifficultyLevels.PRO:
        min = 400
        max = 450
        break
      case DifficultyLevels.GOD:
        min = 300
        max = 400
        break
      default:
        min = 600
        max = 700
    }

    return min + Math.random() * (max - min)
  }

  const activateRandomMole = () => {
    const randomId = Math.round(Math.random() * (molesActiveStatus.length - 1))

    if (randomId === lastActivatedMoleId) {
      activateRandomMole()
      return
    }

    setMolesActiveStatus(state => {
      const stateCopy = [...state]
      stateCopy[randomId] = true

      return stateCopy
    })

    lastActivatedMoleId = randomId
  }

  const peek = () => {
    wasAlreadyHitOnce.current = false

    if (!isPlaying) {
      clearTimeout(timeoutId.current)
      setMolesActiveStatus(state => state.map(() => false))
      return
    }

    const time = getRandomTime(difficulty)
    activateRandomMole()

    timeoutId.current = window.setTimeout(() => {
      setMolesActiveStatus(state => state.map(() => false))
      peek()
    }, time)
  }

  useEffect(peek, [isPlaying])

  return (
    <div ref={gameBoardElRef} css={gameBoardStyles}>
      {molesActiveStatus.map((moleStatus, i) => (
        <div key={i} css={holeStyles}>
          <div
            onClick={handleMoleClick}
            css={() => moleStyles(moleStatus)}
          />
        </div>
      ))}
    </div>
  )
}
