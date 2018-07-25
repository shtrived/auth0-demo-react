import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import AuthorizedNavbar from './AuthorizedNavbar';
import PublicNavbar from './PublicNavbar';

import authorizationService from '../../services/AuthorizationService';

import logo from '../../images/logo.svg';

class Navbar extends React.Component {
  static propTypes = {
    private: PropTypes.bool,
  };

  handleLogin() {
    authorizationService.login();
  }

  handleLogout() {
    authorizationService.logout();
  }

  handleLogoutFederated() {
    authorizationService.logoutFederated();
  }

  render() {
    return (
      <Menu borderless fixed="top">
        <Container>
          <Menu.Item as="a" header>
            <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
            Auth0 Demo - React
          </Menu.Item>
          {this.props.private ? (
            <AuthorizedNavbar
              handleLogout={this.handleLogout}
              handleLogoutFederated={this.handleLogoutFederated}
            />
          ) : (
            <PublicNavbar handleLogin={this.handleLogin} />
          )}
        </Container>
      </Menu>
    );
  }
}

export default Navbar;
