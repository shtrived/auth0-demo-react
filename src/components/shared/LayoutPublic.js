import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

import NavbarSticky from './NavbarSticky';

import AboutUs from '../AboutUs';
import Error from '../Error';
import Home from '../Home';

const propTypes = {
  match: PropTypes.object
};

function LayoutPublic({ match }) {
  return (
    <React.Fragment>
      <NavbarSticky />
      <Container className="mt-3">
        <Route path={`${match.path}`} component={Home} exact />
        <Route path={`${match.path}about-us`} component={AboutUs} exact />
        <Route
          path={`${match.path}error/:error/description/:description`}
          component={Error}
          exact
        />
      </Container>
    </React.Fragment>
  );
}

LayoutPublic.propTypes = propTypes;

export default LayoutPublic;
