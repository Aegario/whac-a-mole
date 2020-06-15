import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
import { createStyles, Theme, withStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { css } from '@emotion/core'

export const StyledTableCell = withStyles((theme: Theme) => createStyles({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontSize: 18,
    padding: 16,
  },
  body: {
    fontSize: 16,
    padding: 12,
  },
}))(TableCell)

export const StyledTableRow = withStyles((theme: Theme) => createStyles({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const useStyles = makeStyles({
  table: {
    minWidth: 660,
  },
})

const tableContainerStyles = css`
  margin-top: 12px;
`

export const TopTable: React.FC<any> = ({ top }) => {
  const classes = useStyles()

  return (
    <TableContainer css={tableContainerStyles} component={Paper}>
      <Table size='small' className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Place</StyledTableCell>
            <StyledTableCell align='center'>Name</StyledTableCell>
            <StyledTableCell align='center'>Score</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array(10).fill('').map((item, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component='th' scope='row'>
                {i + 1}
              </StyledTableCell>
              <StyledTableCell align='center'>{top[i] ? top[i].name : '...'}</StyledTableCell>
              <StyledTableCell align='center'>{top[i] ? top[i].score : '...'}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
