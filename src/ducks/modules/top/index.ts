import { createAction, handleActions } from 'redux-actions'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import axios from 'axios'

//#region Actions
enum TopActions {
  fetchPlaceRequest = 'FETCH_PLACE_REQUEST',
  fetchPlaceSuccess = 'FETCH_PLACE_SUCCESS',
  fetchPlaceFailure = 'FETCH_PLACE_FAILURE',

  topRequest = 'TOP_REQUEST',
  topSuccess = 'TOP_SUCCESS',
  topFailure = 'TOP_FAILURE',
}

const fetchPlaceRequest = createAction(TopActions.fetchPlaceRequest)
const fetchPlaceSuccess = createAction(TopActions.fetchPlaceSuccess)
const fetchPlaceFailure = createAction(TopActions.fetchPlaceFailure)

const topRequest = createAction(TopActions.topRequest)
const topSuccess = createAction(TopActions.topSuccess)
const topFailure = createAction(TopActions.topFailure)
//#endregion

//#region Reducers
export const topReducer = handleActions({
  [TopActions.fetchPlaceSuccess]: (state, action) => false,
}, {})
//#endregion

//#region Thunks
export const fetchPlace = (
  level: string,
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch(fetchPlaceRequest())

  try {
    const { data: { data } } = await axios('/place')

    dispatch(fetchPlaceSuccess({ [level]: data }))
    console.log(data)
  } catch (err) {
    dispatch(fetchPlaceFailure())
    return err
  }
}

export const fetchTop = (
  level: string,
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch(topRequest())

  try {
    const { data: { data } } = await axios(`/top?level=${level}`)

    dispatch(topSuccess({ top: data }))
    console.log(data)
  } catch (err) {
    dispatch(topFailure())
    return err
  }
}
//#endregion
