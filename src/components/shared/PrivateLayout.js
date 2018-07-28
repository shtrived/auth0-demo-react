import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import PrivateRoute from '../../services/PrivateRoute';

import Clients from '../../containers/Clients';
import Secret from '../Secret';

import Navbar from './Navbar';

const propTypes = {
  match: PropTypes.object,
};

function PrivateLayout({ match }) {
  return (
    <React.Fragment>
      <Navbar private />
      <Container>
        <Route path={`${match.path}`} component={Clients} exact />
        <PrivateRoute
          path={`${match.path}/secret`}
          component={Secret}
          requireMfa
          exact
        />
      </Container>
    </React.Fragment>
  );
}

PrivateLayout.propTypes = propTypes;

export default PrivateLayout;
