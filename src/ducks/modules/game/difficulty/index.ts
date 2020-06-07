import { createAction, handleActions } from 'redux-actions'
import {State} from 'interfaces'
import {AnyAction} from 'redux'

//#region Actions
export enum DifficultyActions {
  selectDifficulty = 'SELECT_DIFFICULTY',
}

export const selectDifficulty = createAction(DifficultyActions.selectDifficulty)
//#endregion

//#region Reducers
export const difficultyReducer = handleActions({
  [DifficultyActions.selectDifficulty]: (state, { payload }) => payload,
}, 'NORMAL')
//#endregion
