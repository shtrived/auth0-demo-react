import React from 'react';
import { Link } from 'react-router-dom';
import {
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import PropTypes from 'prop-types';

import authorizationService from '../../services/AuthorizationService';

const propTypes = {
  onPasswordChange: PropTypes.func
};

class NavbarPrivate extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogoutFederated = this.handleLogoutFederated.bind(this);
    this.state = {
      email: '...'
    };
  }

  componentDidMount() {
    authorizationService.getProfile().then(profile => {
      this.setState({
        email: profile.email
      });
    });
  }

  handleChangePassword() {
    const { onPasswordChange } = this.props;
    authorizationService
      .changePassword()
      .then(resp => {
        onPasswordChange(resp);
      })
      .catch(err => {
        onPasswordChange(err.description);
      });
  }

  handleLogout() {
    authorizationService.logout();
  }

  handleLogoutFederated() {
    authorizationService.logoutFederated();
  }

  render() {
    return (
      <React.Fragment>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/app">
              <i className="fas fa-window-restore fa-fw" /> Applications
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/app/secret">
              <i className="fas fa-user-secret fa-fw" /> Secret
            </NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              <i className="fas fa-user fa-fw" /> {this.state.email}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                className="btn btn-link nav-link"
                tag={Link}
                to="/app/profile"
              >
                <i className="fas fa-user fa-fw" /> Profile
              </DropdownItem>
              <DropdownItem
                className="btn btn-link nav-link"
                tag={Link}
                to="/app/password"
              >
                <i className="fas fa-lock fa-fw" /> Change password
              </DropdownItem>
              <DropdownItem
                className="btn btn-link nav-link"
                onClick={this.handleChangePassword}
              >
                <i className="fas fa-lock fa-fw" /> Change password (email)
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                className="btn btn-link nav-link"
                onClick={this.handleLogout}
              >
                <i className="fas fa-sign-out-alt fa-fw" /> Log out
              </DropdownItem>
              <DropdownItem
                className="btn btn-link nav-link"
                onClick={this.handleLogoutFederated}
              >
                <i className="fas fa-sign-out-alt fa-fw" /> Log out (federated)
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

NavbarPrivate.propTypes = propTypes;

export default NavbarPrivate;
