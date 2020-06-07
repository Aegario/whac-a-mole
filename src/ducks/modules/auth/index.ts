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

  fetchProfileRequest = 'FETCH_PROFILE_REQUEST',
  fetchProfileSuccess = 'FETCH_PROFILE_SUCCESS',
  fetchProfileFailure = 'FETCH_PROFILE_FAILURE',
}

const registerRequest = createAction(AuthActions.registerRequest)
const registerSuccess = createAction(AuthActions.registerSuccess)
const registerFailure = createAction(AuthActions.registerFailure)

const loginRequest = createAction(AuthActions.loginRequest)
const loginSuccess = createAction(AuthActions.loginSuccess)
const loginFailure = createAction(AuthActions.loginFailure)

const fetchProfileRequest = createAction(AuthActions.fetchProfileRequest)
const fetchProfileSuccess = createAction(AuthActions.fetchProfileSuccess)
const fetchProfileFailure = createAction(AuthActions.fetchProfileFailure)
//#endregion

//#region Reducers
export const authReducer = handleActions({
  [AuthActions.registerSuccess]: (state, { payload }) => payload,
  [AuthActions.loginSuccess]: (state, { payload }) => payload,
  [AuthActions.fetchProfileSuccess]: (state, { payload }) => payload,
}, {})
//#endregion

interface UserData {
  name: string,
  password: string,
}

//#region Thunks
export const register = (
  userData: UserData,
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch(registerRequest(userData))

  try {
    const { data: { data } } = await axios('/register', {
      method: 'POST',
      data: userData,
    })

    axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
    localStorage.setItem('token', data.token)
    dispatch(registerSuccess({ user: data.user }));
  } catch (err) {
    dispatch(registerFailure())
    return err
  }
}

export const login = (
  userData: UserData,
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch(loginRequest())

  try {
    const { data: { data } } = await axios('/login', {
      method: 'POST',
      data: userData,
    })

    axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
    localStorage.setItem('token', data.token)
    dispatch(loginSuccess({ user: data.user }));
  } catch (err) {
    dispatch(loginFailure())
    return {
      name: 'Invalid email or password',
    }
  }
}

export const fetchProfile = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch(fetchProfileRequest())

  try {
    const { data: { data } } = await axios('/profile')
    dispatch(fetchProfileSuccess({ user: data }))
  } catch (err) {
    dispatch(fetchProfileFailure())
    return err
  }
}
//#endregion
