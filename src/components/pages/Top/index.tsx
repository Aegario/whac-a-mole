import React from 'react'
import { Container } from '@material-ui/core'
import { css } from '@emotion/core'

import { Header } from 'components/common/Header'
import { RootContainer } from 'components/common/RootContainer'

export const Top = () => (
  <RootContainer>
    <Header />
    <Container maxWidth='md'>
      <p>Top</p>
    </Container>
  </RootContainer>
)
