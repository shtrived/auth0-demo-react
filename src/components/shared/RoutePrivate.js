import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import authorizationService from '../../services/AuthorizationService';

const propTypes = {
  component: PropTypes.any,
  requireMfa: PropTypes.bool
};

class RoutePrivate extends React.Component {
  render() {
    const { component: Component, requireMfa, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          if (!authorizationService.isAuthenticated()) {
            authorizationService.login();
            return null;
          }
          if (requireMfa && !authorizationService.hasMfa()) {
            authorizationService.stepUpAuthentication('/app/secret');
            return null;
          }
          return <Component {...props} />;
        }}
      />
    );
  }
}

RoutePrivate.propTypes = propTypes;

export default RoutePrivate;
