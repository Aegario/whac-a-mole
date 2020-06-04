import React from 'react'
import { css } from '@emotion/core'

const headerStyles = css`
  padding-bottom: 18px;
  font-size: 28px;
`

interface AuthFormHeaderProps {
  title: string,
}

export const AuthFormHeader: React.FC<AuthFormHeaderProps> = ({ title }) => (
  <h1 css={headerStyles}>{title}</h1>
)
