import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function PublicNavbar({ handleLogin, handleSignup }) {
  return (
    <React.Fragment>
      <Menu.Item as={NavLink} to="/" exact>
        Home
      </Menu.Item>
      <Menu.Item as={NavLink} to="/about-us">
        About Us
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item onClick={handleLogin} position="right">
          <Icon name="sign in" /> Log in
        </Menu.Item>
        <Menu.Item onClick={handleSignup} position="right">
          <Icon name="signup" /> Sign up
        </Menu.Item>
      </Menu.Menu>
    </React.Fragment>
  );
}

PublicNavbar.propTypes = {
  handleLogin: PropTypes.func,
  handleSignup: PropTypes.func
};

export default PublicNavbar;
