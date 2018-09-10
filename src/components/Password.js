import React from 'react';
import PropTypes from 'prop-types';

import FormPassword from './FormPassword';

const propTypes = {};

class Password extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="py-3">
          <h2>Password</h2>
          <p className="lead">Update password.</p>
        </div>
        <FormPassword />
      </React.Fragment>
    );
  }
}

Password.propTypes = propTypes;

export default Password;
