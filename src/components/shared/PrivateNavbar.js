import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown, Icon, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const propTypes = {
  email: PropTypes.string,
  handleLogout: PropTypes.func,
  handleLogoutFederated: PropTypes.func,
  handleChangePassword: PropTypes.func,
};

function AuthorizedNavbar({
  email,
  handleLogout,
  handleLogoutFederated,
  handleChangePassword,
}) {
  return (
    <React.Fragment>
      <Menu.Item as={NavLink} to="/app" exact>
        <Icon name="window restore outline" /> Clients
      </Menu.Item>
      <Menu.Item as={NavLink} to="/app/secret" exact>
        <Icon name="user secret" /> Secret
      </Menu.Item>
      <Menu.Menu position="right">
        <Dropdown
          trigger={
            <span>
              <Icon name="user" /> {email}
            </span>
          }
          pointing
          className="link item"
        >
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={handleChangePassword}
              text="Change password"
              icon="lock"
            />
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={handleLogout}
              text="Log out"
              icon="sign out"
            />
            <Dropdown.Item
              onClick={handleLogoutFederated}
              text="Log out (federated)"
              icon="sign out"
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </React.Fragment>
  );
}

AuthorizedNavbar.propTypes = propTypes;

export default AuthorizedNavbar;
