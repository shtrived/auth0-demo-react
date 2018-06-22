import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const propTypes = {
  handleLogin: PropTypes.func,
};

function PublicNavbar({ handleLogin }) {
  return (
    <React.Fragment>
      <Menu.Item as={NavLink} to="/" exact>
        Home
      </Menu.Item>
      <Menu.Item as={NavLink} to="/about-us">
        About Us
      </Menu.Item>
      <Menu.Item onClick={handleLogin} position="right">
        <Icon name="sign in" /> Log in
      </Menu.Item>
    </React.Fragment>
  );
}

PublicNavbar.propTypes = propTypes;

export default PublicNavbar;
