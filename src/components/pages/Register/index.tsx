import React from 'react'
import { css } from '@emotion/core'
import { Paper } from '@material-ui/core'

import { Container } from 'components/common/Container'
import { RegisterForm } from 'components/pages/Register/RegisterForm'

const wrapperStyles = css`
  width: 372px;
`

export const Register: React.FC = () => (
  <Container auth>
    <Paper css={wrapperStyles} elevation={3}>
      <RegisterForm />
    </Paper>
  </Container>
)
