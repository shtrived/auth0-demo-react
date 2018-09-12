import React from 'react';

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
        <div className="row">
          <div className="col-md-8">
            <FormPassword />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Password.propTypes = propTypes;

export default Password;
