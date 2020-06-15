import { createAction, handleActions } from 'redux-actions'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import axios from 'axios'

import {Member, TopDataState} from 'interfaces/top'

//#region Actions
export enum TopDataActions {
  fetchTopRequest = 'FETCH_TOP_REQUEST',
  fetchTopSuccess = 'FETCH_TOP_SUCCESS',
  fetchTopFailure = 'FETCH_TOP_FAILURE',
}

const fetchTopRequest = createAction(TopDataActions.fetchTopRequest)
const fetchTopSuccess = createAction(TopDataActions.fetchTopSuccess)
const fetchTopFailure = createAction(TopDataActions.fetchTopFailure)
//#endregion

//#region Reducers
export const topDataReducer = handleActions<TopDataState>({
  [TopDataActions.fetchTopSuccess]: (state, { payload }) => ({...state, ...payload}),
}, {
  beginner: null,
  normal: null,
  pro: null,
  god: null,
})
//#endregion

//#region Thunks
export const fetchTop = (
  level: string,
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch(fetchTopRequest())

  try {
    const { data: { data: { top } } } = await axios(`/top?level=${level}`)

    const memberList = top.reduce((acc: Member[], item: any) => [...acc, {
      name: item.user.name,
      score: item.score,
    }], [])

    dispatch(fetchTopSuccess({ [level]: memberList }))
  } catch (err) {
    dispatch(fetchTopFailure())
    return err
  }
}
//#endregion
