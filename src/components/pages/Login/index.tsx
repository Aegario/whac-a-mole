import React from 'react'
import { css } from '@emotion/core'
import { Paper } from '@material-ui/core'

import { Container } from 'components/common/Container'
import { LoginForm } from 'components/pages/Login/LoginForm'

const wrapperStyles = css`
  width: 372px;
`

export const Login: React.FC = () => (
  <Container auth>
    <Paper css={wrapperStyles} elevation={3}>
      <LoginForm />
    </Paper>
  </Container>
)
