import React from 'react'
import { css } from '@emotion/core'
import * as Yup from 'yup'
import {
  Field,
  Form,
  Formik,
  FieldProps,
  FormikProps,
} from 'formik'

import { TextField } from 'components/common/TextField'
import { Button } from 'components/common/Button'

//#region Styles
const formStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 18px 32px 30px;
  font-family: 'Barlow', sans-serif;
`

const headerStyles = css`
  padding-bottom: 18px;
  font-size: 28px;
`

const textFieldStyles = css`
  && {
    margin: 4px 0;
    width: 100%;
    
    label {
      font-size: 14px;
    }
  }
`

const buttonStyles = css`
  && {
    margin-top: 4px;
  }
`
//#endregion

export const RegisterForm: React.FC = () => (
  <Formik
    initialValues={{
      username: '',
      password: '',
      passwordConfirm: '',
    }}
    onSubmit={values => {
      console.log(values)
    }}
    validationSchema={Yup.object({
      username: Yup.string().max(12).min(4).required('This field is required'),
      password: Yup.string().max(30).min(6).required('This field is required'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('This field is required'),
    })}
  >
    {(formik: FormikProps<any>) => (
      <Form css={formStyles}>
        <h1 css={headerStyles}>Register</h1>
        <Field type='text' name='username'>
          {(fieldProps: FieldProps) => (
            <TextField
              {...fieldProps}
              css={textFieldStyles}
              label='Username'
              required
              autoFocus
            />
          )}
        </Field>
        <Field name='password'>
          {(fieldProps: FieldProps) => (
            <TextField
              {...fieldProps}
              css={textFieldStyles}
              type='password'
              label='Password'
              required
            />
          )}
        </Field>
        <Field name='passwordConfirm'>
          {(fieldProps: FieldProps) => (
            <TextField
              {...fieldProps}
              css={textFieldStyles}
              type='password'
              label='Repeat password'
              required
            />
          )}
        </Field>
        <Button
          css={buttonStyles}
          type='submit'
          disabled={!formik.isValid || !formik.dirty || !formik.values.passwordConfirm.length}
          fullWidth
        >
          Register
        </Button>
      </Form>
    )}
  </Formik>
)
