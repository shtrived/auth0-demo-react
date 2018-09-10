import React from 'react';
import PropTypes from 'prop-types';

import FormProfile from './FormProfile';

const propTypes = {};

class Profile extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="py-3">
          <h2>Profile</h2>
          <p className="lead">Manage profile properties.</p>
        </div>
        <FormProfile />
      </React.Fragment>
    );
  }
}

Profile.propTypes = propTypes;

export default Profile;
