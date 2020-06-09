import React from 'react'
import MuiButton, { ButtonProps } from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { css } from '@emotion/core'
import { Theme } from '@material-ui/core'

const buttonStyles = (theme: Theme, isFetching: boolean) => css`
  && {
    color: ${theme.palette.common.white};
    background-color: ${isFetching ? 'rgba(0, 0, 0, 0.12)' : `${theme.palette.primary}`};
  }
  
  &&:disabled {
    color: ${theme.palette.common.white};
  }
  
  &&:hover {
    background-color: ${isFetching ? 'rgba(0, 0, 0, 0.12)' : `${theme.palette.primary}`};
  }
`

interface CustomButtonProps extends ButtonProps {
  isFetching?: boolean,
}

export const Button: React.FC<CustomButtonProps> = ({ children, isFetching = false, ...rest }) => (
  <MuiButton
    css={(theme) => buttonStyles(theme, isFetching)}
    color='secondary'
    variant='contained'
    disabled={isFetching || rest.disabled}
    {...rest}
  >
    {isFetching ? <CircularProgress size={24} color='secondary' /> : children}
  </MuiButton>
)
