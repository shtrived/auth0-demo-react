import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const propTypes = {
  handleLogout: PropTypes.func,
  handleLogoutFederated: PropTypes.func,
};

function AuthorizedNavbar({ handleLogout, handleLogoutFederated }) {
  return (
    <React.Fragment>
      <Menu.Item as={NavLink} to="/app">
        Clients
      </Menu.Item>
      <Menu.Item onClick={handleLogout} position="right">
        <Icon name="sign out" /> Log out
      </Menu.Item>
      <Menu.Item onClick={handleLogoutFederated} position="right">
        <Icon name="sign out" /> Log out (federated)
      </Menu.Item>
    </React.Fragment>
  );
}

AuthorizedNavbar.propTypes = propTypes;

export default AuthorizedNavbar;
