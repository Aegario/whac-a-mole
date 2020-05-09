import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { State } from 'interfaces'
import { Routes } from 'constants/routes'

interface ProtectedRouteProps {
  exact?: boolean,
  path: string,
  component: React.FC
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...props
}) => {
  const isLoggedIn = useSelector<State, boolean>(state => (state.auth))

  return (
    <Route
      {...props}
      render={(routeProps: RouteProps) => (
        isLoggedIn
          ? <Component {...routeProps} />
          : (
            <Redirect to={{
              pathname: Routes.login,
              state: { referrer: routeProps.location },
            }}
            />
          )
      )}
    />
  )
}
