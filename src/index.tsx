import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import axios from 'axios'

import { App } from 'components/App'
import { configureStore } from 'ducks/configureStore'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
)
