import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';


/**
 * high-order component for any routes that you want to protect
 * and make accessible to authenticated users only. The
 *  component will either allow the user to continue to the
 *  specified private component, or redirect them to the sign
 *  in page if they are not logged in.
 */

export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={ props => context.authenticatedUser ? (
            <Component {...props} />
          ) : (
            <Redirect to={{
              pathname: '/signin',
              state: { from: props.location },
            }}/>
          )
          }
        />
      )}
    </Consumer>
  );
};