import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

import StickyNavbar from './StickyNavbar';

import AboutUs from '../AboutUs';
import Error from '../Error';
import Home from '../Home';

const propTypes = {
  match: PropTypes.object
};

function PublicLayout({ match }) {
  return (
    <React.Fragment>
      <StickyNavbar />
      <Container style={{ marginTop: '7em' }}>
        <Switch>
          <Route path={`${match.path}`} component={Home} exact />
          <Route path={`${match.path}about-us`} component={AboutUs} />
          <Route
            path={`${match.path}error/:error/description/:description`}
            component={Error}
          />
        </Switch>
      </Container>
    </React.Fragment>
  );
}

PublicLayout.propTypes = propTypes;

export default PublicLayout;
