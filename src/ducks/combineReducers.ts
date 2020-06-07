import { combineReducers } from 'redux'

import { authReducer } from 'ducks/modules/auth'
import { loadingReducer } from 'ducks/modules/loading'
import { gameReducer } from 'ducks/modules/game'
import { topReducer } from 'ducks/modules/top'

export const reducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  game: gameReducer,
  top: topReducer,
})
