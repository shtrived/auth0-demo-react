import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const propTypes = {
  match: PropTypes.object
};

function Error({ match }) {
  return (
    <Container text style={{ marginTop: '7em' }}>
      <Header as="h1">Error</Header>
      <Header as="h3">{match.params.error}</Header>
      <p>{match.params.description}</p>
    </Container>
  );
}

Error.propTypes = propTypes;

export default Error;
