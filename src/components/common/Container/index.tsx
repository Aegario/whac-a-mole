import React from 'react'
import { css } from '@emotion/core'

const wrapperStyles = css`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
`

const containerStyles = (auth: boolean) => css`
  width: 1080px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${auth ? 'center' : 'flex-start'};
`

interface ContainerProps {
  auth?: boolean,
}

export const Container: React.FC<ContainerProps> = ({ children, auth = false }) => (
  <div css={wrapperStyles}>
    <div css={() => containerStyles(auth)}>
      {children}
    </div>
  </div>
)
