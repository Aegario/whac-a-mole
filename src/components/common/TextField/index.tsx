import React from 'react'
import { FieldProps } from 'formik'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { css } from '@emotion/core'
import {
  TextField as MuiTextField,
  InputAdornment,
  Tooltip,
  TextFieldProps,
  Theme,
} from '@material-ui/core'

const errorIconStyles = (theme: Theme) => css`
  color: ${theme.palette.error.main};
  cursor: pointer;
  
  && {
    font-size: 24px;
  }
`

const tooltipStyles = css`
  font-size: 14px;
  padding: 4px;
`

const styles = (theme: Theme) => css`
  && {
    .MuiOutlinedInput-adornedEnd {
      padding-right: 8px;
    }
    
    .Mui-error fieldset {
      border-color: ${theme.palette.error.main};
    }

    label.Mui-focused.Mui-error  {
      color: ${theme.palette.error.main};
    }

    .Mui-error input {
      caret-color: ${theme.palette.error.main};
    }
  }
`

type FieldPropsTextField = FieldProps & TextFieldProps

export const TextField: React.FC<FieldPropsTextField> = ({
  meta,
  field,
  form,
  ...props
}) => {
  const showError = meta.error && meta.touched

  return (
    <MuiTextField
      {...props}
      {...field}
      css={styles}
      size='small'
      variant='outlined'
      color='secondary'
      error={!!showError}
      InputProps={{
        style: { fontSize: '14px' },
        endAdornment: showError ? (
          <InputAdornment position='end'>
            <Tooltip title={(
              <div css={tooltipStyles}>
                {meta.error?.charAt(0)?.toUpperCase() + meta.error?.slice(1)}
              </div>
            )}
            >
              <ErrorOutlineIcon css={errorIconStyles} />
            </Tooltip>
          </InputAdornment>
        ) : null,
      }}
    />
  )
}
