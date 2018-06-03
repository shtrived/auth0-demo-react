import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import Navbar from './Navbar';

import AboutUs from '../AboutUs';
import Home from '../Home';

const propTypes = {
  match: PropTypes.object
};

function PublicLayout({ match }) {
  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <Switch>
          <Route path={`${match.path}`} component={Home} exact />
          <Route path={`${match.path}about-us`} component={AboutUs} />
        </Switch>
      </Container>
    </React.Fragment>
  );
}

PublicLayout.propTypes = propTypes;

export default PublicLayout;
