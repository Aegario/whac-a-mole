import { createAction, handleActions } from 'redux-actions'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import axios from 'axios'

import { UserStatsState } from 'interfaces/top'

//#region Actions
export enum UserStatsActions {
  fetchPlaceRequest = 'FETCH_PLACE_REQUEST',
  fetchPlaceSuccess = 'FETCH_PLACE_SUCCESS',
  fetchPlaceFailure = 'FETCH_PLACE_FAILURE',
}

const fetchPlaceRequest = createAction(UserStatsActions.fetchPlaceRequest)
const fetchPlaceSuccess = createAction(UserStatsActions.fetchPlaceSuccess)
const fetchPlaceFailure = createAction(UserStatsActions.fetchPlaceFailure)
//#endregion

//#region Reducers
export const userStatsReducer = handleActions<UserStatsState>({
  [UserStatsActions.fetchPlaceSuccess]: (state, { payload }) => ({...state, ...payload}),
}, {
  beginner: null,
  normal: null,
  pro: null,
  god: null,
})
//#endregion

//#region Thunks
export const fetchPlace = (
  level: string
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch(fetchPlaceRequest())

  try {
    const { data: { data } } = await axios(`/place?level=${level}`)

    let score = {}

    if (data.score) {
      score = {
        score: data.score.score,
        place: data.score.place,
      }
    }

    dispatch(fetchPlaceSuccess({ [level]: score }))
  } catch (err) {
    dispatch(fetchPlaceFailure())
    return err
  }
}
//#endregion
