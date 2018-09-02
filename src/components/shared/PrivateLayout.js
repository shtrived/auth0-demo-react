import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import PrivateRoute from '../../services/PrivateRoute';

import Clients from '../../containers/Clients';
import Secret from '../Secret';

import StickyNavbar from './StickyNavbar';

const propTypes = {
  match: PropTypes.object
};

function PrivateLayout({ match }) {
  return (
    <React.Fragment>
      <StickyNavbar private />
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
