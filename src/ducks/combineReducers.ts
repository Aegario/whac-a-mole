import { combineReducers } from 'redux'

import { authReducer } from 'ducks/modules/auth'
import { difficultyReducer } from 'ducks/modules/difficulty'

export const reducer = combineReducers({
  auth: authReducer,
  difficulty: difficultyReducer,
})
