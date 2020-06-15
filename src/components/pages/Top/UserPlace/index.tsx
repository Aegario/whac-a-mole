import React from 'react'
import { useSelector } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import CircularProgress from '@material-ui/core/CircularProgress'
import { css } from '@emotion/core'

import { State } from 'interfaces'
import { ScoreState } from 'interfaces/top'
import { StyledTableCell } from 'components/pages/Top/TopTable'
import { LEVELS } from 'constants/levels'

const tableContainerStyles = css`
  margin-top: 16px;
`

interface UserPlaceProps {
  idx: number,
}

export const UserPlace: React.FC<UserPlaceProps> = ({ idx }) => {
  const userName = useSelector<State, string>(state => state.auth.user.name)
  const userStats = useSelector<State, ScoreState>(state => state.top.userStats[LEVELS[idx]])
  const isPlaceLoading = useSelector<State, boolean>(state => state.loading.place)
  const playedAtLeastOnce = userStats?.score

  if (!playedAtLeastOnce) return null

  if (!userStats || isPlaceLoading) return <CircularProgress />

  return (
    <TableContainer css={tableContainerStyles} component={Paper}>
      <Table>
        <TableBody>
          <TableRow key={userStats.place}>
            <StyledTableCell component='th' scope='row'>
              {userStats.place}
            </StyledTableCell>
            <StyledTableCell align='center'>{userName}</StyledTableCell>
            <StyledTableCell align='center'>{userStats.score}</StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
