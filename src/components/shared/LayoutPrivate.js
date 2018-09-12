import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

import RoutePrivate from '../../components/shared/RoutePrivate';

import ContainerApplications from '../../containers/ContainerApplications';
import ContainerErrors from '../../containers/ContainerErrors';
import ContainerPassword from '../../containers/ContainerPassword';
import ContainerProfile from '../../containers/ContainerProfile';
import Secret from '../Secret';

import NavbarSticky from './NavbarSticky';

const propTypes = {
  match: PropTypes.object
};

function LayoutPrivate({ match }) {
  return (
    <React.Fragment>
      <NavbarSticky private />
      <Container className="mt-5">
        <ContainerErrors />
        <Route path={`${match.path}`} component={ContainerApplications} exact />
        <Route
          path={`${match.path}/password`}
          component={ContainerPassword}
          exact
        />
        <Route
          path={`${match.path}/profile`}
          component={ContainerProfile}
          exact
        />
        <RoutePrivate
          path={`${match.path}/secret`}
          component={Secret}
          requireMfa
          exact
        />
      </Container>
      <footer className="footer">
        <Container>
          <span className="text-muted">
            &copy; Let's Do Auth demonstration website.
          </span>
        </Container>
      </footer>{' '}
    </React.Fragment>
  );
}

LayoutPrivate.propTypes = propTypes;

export default LayoutPrivate;
