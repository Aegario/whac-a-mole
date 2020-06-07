import { createAction, handleActions } from 'redux-actions'
import { AnyAction, combineReducers } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import axios from 'axios'

import { scoreReducer } from 'ducks/modules/game/score'
import { difficultyReducer } from 'ducks/modules/game/difficulty'
import { State } from 'interfaces'

//#region Actions
enum GameActions {
  postScoreRequest = 'POST_SCORE_REQUEST',
  postScoreSuccess = 'POST_SCORE_SUCCESS',
  postScoreFailure = 'POST_SCORE_FAILURE',
}

const postScoreRequest = createAction(GameActions.postScoreRequest)
const postScoreSuccess = createAction(GameActions.postScoreSuccess)
const postScoreFailure = createAction(GameActions.postScoreFailure)
//#endregion

//#region Thunks
export const postScore = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => State) => {
  const gameState = getState().game
  dispatch(postScoreRequest())

  try {
    await axios('/place', {
      method: 'POST',
      data: {
        score: gameState.score,
        level: gameState.difficulty.toLowerCase(),
      },
    })

    dispatch(postScoreSuccess())
  } catch (err) {
    dispatch(postScoreFailure())
    return err
  }
}
//#endregion

export const gameReducer = combineReducers({
  score: scoreReducer,
  difficulty: difficultyReducer,
})
