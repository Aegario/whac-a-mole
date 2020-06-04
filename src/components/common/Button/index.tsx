import React from 'react'
import MuiButton, { ButtonProps } from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { css } from '@emotion/core'
import { Theme } from '@material-ui/core'

const buttonStyles = (theme: Theme) => css`
  &&:disabled {
    color: ${theme.palette.common.white};
  }
  
  && {
    color: ${theme.palette.common.white};
  }
`

interface CustomButtonProps extends ButtonProps {
  isFetching?: boolean,
}

export const Button: React.FC<CustomButtonProps> = ({ children, isFetching = false, ...rest }) => (
  <MuiButton
    css={buttonStyles}
    color='secondary'
    variant='contained'
    disabled={isFetching || rest.disabled}
    {...rest}
  >
    {isFetching ? <CircularProgress size={20} /> : children}
  </MuiButton>
)
