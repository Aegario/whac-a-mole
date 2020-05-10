import { combineReducers } from 'redux'

import { authReducer } from 'ducks/modules/auth'
import { difficultyReducer } from 'ducks/modules/difficulty'
import { scoreReducer } from 'ducks/modules/score'

export const reducer = combineReducers({
  auth: authReducer,
  difficulty: difficultyReducer,
  score: scoreReducer,
})
