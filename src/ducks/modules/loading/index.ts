import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'

import { AuthActions } from 'ducks/modules/auth'
import { TopDataActions } from 'ducks/modules/top/topData'
import { UserStatsActions } from 'ducks/modules/top/userStats'

const authByToken = handleActions({
  [AuthActions.fetchProfileRequest]: () => true,
  [AuthActions.fetchProfileSuccess]: () => false,
  [AuthActions.fetchProfileFailure]: () => false,
}, false)

const top = handleActions({
  [TopDataActions.fetchTopRequest]: () => true,
  [TopDataActions.fetchTopSuccess]: () => false,
  [TopDataActions.fetchTopFailure]: () => false,
}, false)

const place = handleActions({
  [UserStatsActions.fetchPlaceRequest]: () => true,
  [UserStatsActions.fetchPlaceSuccess]: () => false,
  [UserStatsActions.fetchPlaceFailure]: () => false,
}, false)

export const loadingReducer = combineReducers({
  authByToken,
  top,
  place,
})
