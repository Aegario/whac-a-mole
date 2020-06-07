import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'

import { AuthActions } from 'ducks/modules/auth'

export const authByToken = handleActions({
  [AuthActions.fetchProfileRequest]: () => true,
  [AuthActions.fetchProfileSuccess]: () => false,
  [AuthActions.fetchProfileFailure]: () => false,
}, false)

export const loadingReducer = combineReducers({
  authByToken,
})
