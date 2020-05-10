import { createAction, handleActions } from 'redux-actions'

//#region Actions
enum scoreActions {
  scoreIncrement = 'INCREMENT',
  scoreReset = 'RESET',
}

export const scoreIncrement = createAction(scoreActions.scoreIncrement)
export const scoreReset = createAction(scoreActions.scoreReset)
//#endregion

//#region Reducers
export const scoreReducer = handleActions({
  [scoreActions.scoreIncrement]: (state) => state + 1,
  [scoreActions.scoreReset]: () => 0,
}, 0)
//#endregion
