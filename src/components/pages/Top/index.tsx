import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import CircularProgress from '@material-ui/core/CircularProgress'
import { css } from '@emotion/core'

import { Container } from 'components/common/Container'
import { RootContainer } from 'components/common/RootContainer'
import { Header } from 'components/common/Header'
import { TopTable } from 'components/pages/Top/TopTable'
import { UserPlace } from 'components/pages/Top/UserPlace'
import { fetchPlace } from 'ducks/modules/top/userStats'
import { fetchTop } from 'ducks/modules/top/topData'
import { State } from 'interfaces'
import { Member } from 'interfaces/top'
import { LEVELS } from 'constants/levels'

//#region Styles
const headerStyles = css`
  padding-top: 1.5vh;
  font-size: 54px;
`

const mainWrapperStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

const topWrapperStyles = css`
  margin-top: 1.6vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const backStyles = css`
  margin-right: 48px;
  cursor: pointer;
`

const forwardStyles = css`
  margin-left: 48px;
  cursor: pointer;
`

const levelStyles = css`
  color: #c40707;
`
//#endregion

export const Top: React.FC = () => {
  const [isInTop, setIsInTop] = useState<boolean>(false)
  const [currentTopIdx, setCurrentTopIdx] = useState<number>(1)
  const top = useSelector<State, Member[]>(state => state.top.topData[LEVELS[currentTopIdx]])
  const isTopLoading = useSelector<State, boolean>(state => state.loading.top)
  const userName = useSelector<State, string>(state => state.auth.user.name)
  const dispatch = useDispatch()
  const backRef = useRef<HTMLDivElement>(null)
  const forwardRef = useRef<HTMLDivElement>(null)

  const handleIdxIncrement = () => setCurrentTopIdx(state => (state === 3 ? 0 : state + 1))
  const handleIdxDecrement = () => setCurrentTopIdx(state => (state === 0 ? 3 : state - 1))

  useEffect(() => {
    const fetchData = async () => {
      if (!top) {
        await dispatch(fetchTop(LEVELS[currentTopIdx]))
        return
      }

      // Checking if user is in top
      let found = false
      top.forEach(user => {
        if (user.name !== userName) return
        found = true
      })

      if (!found) dispatch(fetchPlace(LEVELS[currentTopIdx]))
      setIsInTop(found)
    }

    fetchData()
  }, [dispatch, currentTopIdx, top, userName])

  useEffect(() => {
    const handleArrowPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        forwardRef?.current?.click?.()
      } else if (e.key === 'ArrowLeft') {
        backRef?.current?.click?.()
      }
    }

    window.addEventListener('keydown', handleArrowPress)

    return () => window.removeEventListener('keydown', handleArrowPress)
  }, [])

  return (
    <RootContainer>
      <Header />
      <Container>

        <h2 css={headerStyles}><span css={levelStyles}>{LEVELS[currentTopIdx]}</span> top</h2>

        {!top || isTopLoading
          ? <CircularProgress />
          : (
            <div css={mainWrapperStyles}>
              <div
                ref={backRef}
                css={backStyles}
                onClick={handleIdxDecrement}
              >
                <ArrowBackIcon fontSize='large'>Previous</ArrowBackIcon>
              </div>


              <div css={topWrapperStyles}>
                <TopTable top={top} />
                {!isInTop ? <UserPlace idx={currentTopIdx} /> : null }
              </div>

              <div
                ref={forwardRef}
                css={forwardStyles}
                onClick={handleIdxIncrement}
              >
                <ArrowForwardIcon fontSize='large'>Next</ArrowForwardIcon>
              </div>
            </div>
          )}

      </Container>
    </RootContainer>
  )
}
