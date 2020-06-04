import React from 'react'
import * as Yup from 'yup'
import { css } from '@emotion/core'
import {
  Field, FieldProps,
  Form,
  Formik,
  FormikProps,
} from 'formik'

import { TextField } from 'components/common/TextField'
import { Button } from 'components/common/Button'
import { AuthFormHeader } from 'components/common/AuthFormHeader'

//#region Styles
const formStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 18px 32px 30px;
  font-family: 'Lato', sans-serif;
`

const textFieldStyles = css`
  && {
    margin: 5px 0;
    width: 100%;
  }
`

const buttonStyles = css`
  && {
    margin-top: 5px;
  }
`
//#endregion

export const LoginForm = () => (
  <Formik
    initialValues={{
      username: '',
      password: '',
    }}
    onSubmit={values => console.log(values)}
    validationSchema={Yup.object({
      username: Yup.string().required('This field is required'),
      password: Yup.string().required('This field is required'),
    })}
  >
    {(formik: FormikProps<any>) => (
      <Form css={formStyles}>
        <AuthFormHeader title='Login' />
        <Field type='text' name='username'>
          {(fieldProps: FieldProps) => (
            <TextField
              {...fieldProps}
              css={textFieldStyles}
              label='Username'
              autoFocus
              required
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
        <Button
          css={buttonStyles}
          type='submit'
          disabled={!formik.isValid || !formik.dirty}
          fullWidth
        >
          Login
        </Button>
      </Form>
    )}
  </Formik>
)
