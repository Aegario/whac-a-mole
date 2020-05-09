import { createAction, handleActions } from 'redux-actions'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import axios from 'axios'

//#region Actions
export enum AuthActions {
  registerRequest = 'REGISTER_REQUEST',
  registerSuccess = 'REGISTER_SUCCESS',
  registerFailure = 'REGISTER_FAILURE',

  loginRequest = 'LOGIN_REQUEST',
  loginSuccess = 'LOGIN_SUCCESS',
  loginFailure = 'LOGIN_FAILURE',
}

const registerRequest = createAction(AuthActions.registerRequest)
const registerSuccess = createAction(AuthActions.registerSuccess)
const registerFailure = createAction(AuthActions.registerFailure)

const loginRequest = createAction(AuthActions.loginRequest)
const loginSuccess = createAction(AuthActions.loginSuccess)
const loginFailure = createAction(AuthActions.loginFailure)
//#endregion

//#region Reducers
export const authReducer = handleActions({
  [AuthActions.registerSuccess]: () => true,
  [AuthActions.loginSuccess]: () => true,
}, true)
//#endregion

interface UserData {
  username: string,
  password: string,
}

//#region Thunks
export const register = (
  userData: UserData,
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch(registerRequest(userData))

  try {
    const { data } = await axios('/register', {
      method: 'POST',
      data: userData,
    })

    dispatch(registerSuccess(data));
    return data
  } catch (err) {
    dispatch(registerFailure())
    throw new Error(err)
  }
}

export const login = (
  userData: UserData,
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch(loginRequest(userData))

  try {
    const { data } = await axios('/login', {
      method: 'POST',
      data: userData,
    })

    dispatch(loginSuccess(data));
    return data
  } catch (err) {
    dispatch(loginFailure())
    throw new Error(err)
  }
}
//#endregion
