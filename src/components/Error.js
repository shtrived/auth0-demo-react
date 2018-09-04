import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  match: PropTypes.object
};

function Error({ match }) {
  return (
    <React.Fragment>
      <h2>Error</h2>
      <h3>{match.params.error}</h3>
      <p>{match.params.description}</p>
    </React.Fragment>
  );
}

Error.propTypes = propTypes;

export default Error;
