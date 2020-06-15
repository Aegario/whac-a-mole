import React from 'react'
import { css } from '@emotion/core'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Field,
  Form,
  Formik,
  FieldProps,
  FormikProps,
} from 'formik'

import { TextField } from 'components/common/TextField'
import { Button } from 'components/common/Button'
import { AuthFormHeader } from 'components/common/AuthFormHeader'
import { register } from 'ducks/modules/auth'
import { Routes } from 'constants/routes'

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

export const RegisterForm: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <Formik
      initialValues={{
        name: '',
        password: '',
        passwordConfirm: '',
      }}
      onSubmit={async values => {
        try {
          await dispatch(register(values))
          history.push(Routes.root)
        } catch (err) {
          console.log(err)
        }
      }}
      validationSchema={Yup.object({
        name: Yup.string().max(12).min(4, 'Username must be at least 4 characters').required('This field is required'),
        password: Yup.string().max(30).min(6).required('This field is required'),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('This field is required'),
      })}
    >
      {(formik: FormikProps<any>) => (
        <Form css={formStyles}>
          <AuthFormHeader title='Register' />
          <Field type='text' name='name'>
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
            isFetching={formik.isSubmitting}
            fullWidth
          >
            Register
          </Button>
        </Form>
      )}
    </Formik>
  )
}
