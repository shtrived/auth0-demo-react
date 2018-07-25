import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import authorizationService from './AuthorizationService';

class AuthorizedRoute extends React.Component {
  static propTypes = {
    component: PropTypes.any,
  };

  render() {
    const { component: Component, ...rest } = this.props;
    if (authorizationService.isAuthenticated()) {
      return <Route {...rest} component={Component} />;
    }
    authorizationService.login();
    return null;
  }
}

export default AuthorizedRoute;
