import React from 'react'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
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
//import { Top } from 'components/pages/Top'
import { Register } from 'components/pages/Register'
import { Login } from 'components/pages/Login'
import { Colors } from 'constants/colors'
import { State } from 'interfaces'

const theme = createMuiTheme({
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
  // const isLoggedIn = useSelector<State, boolean>(state => state.auth)
  const isLoggedIn = false

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <ProtectedRoute exact path={Routes.root} component={Game} />
            {/*<ProtectedRoute path={Routes.top} component={Top} />*/}
            <Route path={Routes.login}>
              {isLoggedIn ? <Redirect to={Routes.root} /> : <Login />}
            </Route>
            <Route path={Routes.register}>
              {isLoggedIn ? <Redirect to={Routes.root} /> : <Register />}
            </Route>
          </Switch>
        </Router>
        <Global styles={globalStyles} />
      </ThemeProvider>
    </MuiThemeProvider>
  )
}
