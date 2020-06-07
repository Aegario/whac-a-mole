import React from 'react'
import * as Yup from 'yup'
import { css } from '@emotion/core'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {
  Field, FieldProps,
  Form,
  Formik,
  FormikProps,
} from 'formik'

import { TextField } from 'components/common/TextField'
import { Button } from 'components/common/Button'
import { AuthFormHeader } from 'components/common/AuthFormHeader'
import { login } from 'ducks/modules/auth'
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

const additionalActionsStyles = (theme: any) => css`
  padding-top: 16px;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  font-size: 14px;
  color: ${theme.palette.grey[600]};
  
  & > div {
    display: flex;
    flex-flow: column nowrap;
  }
`

const actionStyles = css`
  font-weight: 700;
  
  &:hover {
    text-decoration: underline;
  }
`
//#endregion

export const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <Formik
      initialValues={{
        name: '',
        password: '',
      }}
      onSubmit={async values => {
        const err = await dispatch(login(values))
        if (!err) {
          history.push(Routes.root)
        } else {
          return err
        }
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('This field is required'),
        password: Yup.string().required('This field is required'),
      })}
    >
      {(formik: FormikProps<any>) => (
        <Form css={formStyles}>
          <AuthFormHeader title='Login' />
          <Field type='text' name='name'>
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
          <div css={additionalActionsStyles}>
            <div>
              Don&apos;t have an account?
              <Link
                css={actionStyles}
                to={Routes.register}
              >
                Register
              </Link>
            </div>
            <Link
              css={actionStyles}
              to={Routes.root}
            >
              Forgot password?
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  )
}
