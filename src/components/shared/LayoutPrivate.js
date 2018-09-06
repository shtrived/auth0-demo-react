import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

import RoutePrivate from '../../services/RoutePrivate';

import ContainerClients from '../../containers/ContainerClients';
import ContainerErros from '../../containers/ContainerErrors';
import Secret from '../Secret';

import NavbarSticky from './NavbarSticky';

const propTypes = {
  match: PropTypes.object
};

function LayoutPrivate({ match }) {
  return (
    <React.Fragment>
      <NavbarSticky private />
      <Container className="mt-7">
        <ContainerErros />
        <Route path={`${match.path}`} component={ContainerClients} exact />
        <RoutePrivate
          path={`${match.path}/secret`}
          component={Secret}
          requireMfa
          exact
        />
      </Container>
    </React.Fragment>
  );
}

LayoutPrivate.propTypes = propTypes;

export default LayoutPrivate;
