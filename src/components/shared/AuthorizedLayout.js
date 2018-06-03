import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import Clients from '../../containers/Clients';

import Navbar from './Navbar';

const propTypes = {
  match: PropTypes.object
};

function AuthorizedLayout({ match }) {
  return (
    <React.Fragment>
      <Navbar private />
      <Container>
        <Route path={`${match.path}`} component={Clients} exact />
      </Container>
    </React.Fragment>
  );
}

AuthorizedLayout.propTypes = propTypes;

export default AuthorizedLayout;
