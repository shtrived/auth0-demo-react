import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import authorizationService from './AuthorizationService';

class CallbackRoute extends React.Component {
  static propTypes = {
    component: PropTypes.any
  };

  componentDidMount() {
    authorizationService.handleAuthentication();
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return <Route {...rest} component={Component} />;
  }
}

export default CallbackRoute;
