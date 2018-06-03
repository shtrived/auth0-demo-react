import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import authorizationService from './AuthorizationService';

class CallbackRoute extends React.Component {
  static propTypes = {
    component: PropTypes.any
  };

  handleAuthentication(props) {
    if (/access_token|id_token|error/.test(props.location.hash)) {
      authorizationService.handleAuthentication();
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          this.handleAuthentication(props);
          return <Component {...props} />;
        }}
      />
    );
  }
}

export default CallbackRoute;
