import React, { useEffect } from 'react'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { globalStyles } from 'constants/globalStyles'
import { Routes } from 'constants/routes'
import { ProtectedRoute } from 'components/common/ProtectedRoute'
import { Game } from 'components/pages/Game'
import { Top } from 'components/pages/Top'
import { Register } from 'components/pages/Register'
import { Login } from 'components/pages/Login'
import { Colors } from 'constants/colors'
import { State } from 'interfaces'
import { fetchProfile } from 'ducks/modules/auth'
import { Loader } from 'components/common/Loader'

const theme = createMuiTheme({
  overrides: {
    MuiCircularProgress: {
      colorSecondary: {
        color: Colors.white,
      },
    },
  },
  palette: {
    primary: {
      main: Colors.yellow,
    },
    secondary: {
      main: Colors.yellowDark,
      contrastText: Colors.dark,
    },
  },
  typography: {
    fontFamily: ['Lato', 'Permanent Marker'].join(','),
    button: {
      fontWeight: 900,
    },
  },
})

export const App = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const isLoggedIn = useSelector<State, string>(state => state.auth?.user?.name)
  const isFetching = useSelector<State, boolean>(state => state.loading.authByToken)

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      dispatch(fetchProfile())
    }
  }, [dispatch, token])

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        {
          (token && !isLoggedIn) || isFetching
            ? <Loader />
            : (
              <Router>
                <Switch>
                  <ProtectedRoute exact path={Routes.root} component={Game} />
                  <ProtectedRoute path={Routes.top} component={Top} />
                  <Route path={Routes.login}>
                    { isLoggedIn ? <Redirect to={Routes.root} /> : <Login />}
                  </Route>
                  <Route path={Routes.register}>
                    { isLoggedIn ? <Redirect to={Routes.root} /> : <Register />}
                  </Route>
                </Switch>
              </Router>
            )
        }
        <Global styles={globalStyles} />
      </ThemeProvider>
    </MuiThemeProvider>
  )
}
