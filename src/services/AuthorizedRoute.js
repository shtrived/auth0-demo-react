import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import authorizationService from './AuthorizationService';

class AuthorizedRoute extends React.Component {
  static propTypes = {
    component: PropTypes.any
  };

  isAuthenticated() {
    return authorizationService.isAuthenticated();
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          this.isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
}

export default AuthorizedRoute;
