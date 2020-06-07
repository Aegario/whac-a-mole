import React from 'react'
import { css } from '@emotion/core'

import { Header } from 'components/common/Header'
import { RootContainer } from 'components/common/RootContainer'
import { Container } from 'components/common/Container'

const pStyles = css`
  padding-top: 44px;
  font-size: 36px;
`

export const Top: React.FC = () => (
  <RootContainer>
    <Header />
    <Container>
      <p css={pStyles}>In progress</p>
    </Container>
  </RootContainer>
)
