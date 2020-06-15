import { combineReducers } from 'redux'
import { topDataReducer } from 'ducks/modules/top/topData'
import { userStatsReducer } from 'ducks/modules/top/userStats'

export const topReducer = combineReducers({
  topData: topDataReducer,
  userStats: userStatsReducer,
})
