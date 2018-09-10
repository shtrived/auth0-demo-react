import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import authorizationService from '../../services/AuthorizationService';

const propTypes = {
  component: PropTypes.any
};

class RouteCallback extends React.Component {
  componentDidMount() {
    authorizationService.handleAuthentication();
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return <Route {...rest} component={Component} />;
  }
}

RouteCallback.propTypes = propTypes;

export default RouteCallback;
