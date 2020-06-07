import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { css } from '@emotion/core'

const wrapperStyles = css`
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Loader = () => (
  <div css={wrapperStyles}>
    <CircularProgress size={60} />
  </div>
)
