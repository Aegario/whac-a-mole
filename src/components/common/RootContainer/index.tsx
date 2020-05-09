import React from 'react'
import { css } from '@emotion/core'
import { Theme } from '@material-ui/core'

const wrapperStyles = (theme: Theme) => css`
  display: flex;
  height: 100vh;
  flex-direction: column;
  background-color: ${theme.palette.primary.main};
`

export const RootContainer: React.FC = ({ children }) => (
  <div css={wrapperStyles}>
    {children}
  </div>
)
