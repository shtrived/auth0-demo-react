import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const propTypes = {
  match: PropTypes.object
};

function Error({ match }) {
  return (
    <div style={{ marginTop: '7em' }}>
      <Header as="h1">Error</Header>
      <Header as="h3">{match.params.error}</Header>
      <p>{match.params.description}</p>
    </div>
  );
}

Error.propTypes = propTypes;

export default Error;
