import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ModalSimple from './ModalSimple';
import PrivateNavbar from './PrivateNavbar';
import PublicNavbar from './PublicNavbar';

import authorizationService from '../../services/AuthorizationService';

import logo from '../../images/logo.svg';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleModalOnClose = this.handleModalOnClose.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.state = {
      email: '...',
      modalMessage: null,
      modalOpen: false
    };
  }

  componentDidMount() {
    if (!this.props.private) {
      return;
    }
    authorizationService.getProfile().then(profile => {
      this.setState({
        email: profile.email
      });
    });
  }

  handleChangePassword() {
    authorizationService
      .changePassword()
      .then(resp => {
        this.setState({
          modalMessage: resp,
          modalOpen: true
        });
      })
      .catch(err => {
        this.setState({
          modalMessage: err.description,
          modalOpen: true
        });
      });
  }

  handleLogin() {
    authorizationService.login();
  }

  handleLogout() {
    authorizationService.logout();
  }

  handleLogoutFederated() {
    authorizationService.logoutFederated();
  }

  handleModalOnClose() {
    this.setState({
      modelMessage: null,
      modalOpen: false
    });
  }

  handleSignup() {
    authorizationService.signup();
  }

  render() {
    return (
      <React.Fragment>
        <ModalSimple
          message={this.state.modalMessage}
          onClose={this.handleModalOnClose}
          open={this.state.modalOpen}
        />
        <Menu borderless fixed="top">
          <Container>
            <Menu.Item as="a" header>
              <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
              Auth0 Demo - React
            </Menu.Item>
            {this.props.private ? (
              <PrivateNavbar
                email={this.state.email}
                handleChangePassword={this.handleChangePassword}
                handleLogout={this.handleLogout}
                handleLogoutFederated={this.handleLogoutFederated}
              />
            ) : (
              <PublicNavbar
                handleLogin={this.handleLogin}
                handleSignup={this.handleSignup}
              />
            )}
          </Container>
        </Menu>
      </React.Fragment>
    );
  }
}

Navbar.propTypes = {
  private: PropTypes.bool
};

export default Navbar;
