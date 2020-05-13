import {
  applyMiddleware,
  compose,
  createStore,
  Middleware,
} from 'redux'
import thunk from 'redux-thunk'

import { reducer } from 'ducks/combineReducers'

export const configureStore = () => {
  const middlewares: Middleware[] = []

  middlewares.push(thunk)

  const composeEnhancers = (
    typeof window === 'object'
    && process.env.NODE_ENV !== 'production'
    // @ts-ignore-start
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    // @ts-ignore-start
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
  )

  return createStore(
    reducer,
    enhancer,
  )
}
