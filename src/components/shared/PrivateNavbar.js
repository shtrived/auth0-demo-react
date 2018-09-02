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

class PrivateNavbar extends React.Component {
  static propTypes = {
    onPasswordChange: PropTypes.func
  };

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
              Clients
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/app/secret">
              Secret
            </NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {this.state.email}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                className="btn btn-link nav-link"
                onClick={this.handleChangePassword}
              >
                <i className="fas fa-unlock-alt fa-fw mr-1" /> Change password
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                className="btn btn-link nav-link"
                onClick={this.handleLogout}
              >
                <i className="fas fa-sign-out-alt fa-fw mr-1" /> Log out
              </DropdownItem>
              <DropdownItem
                className="btn btn-link nav-link"
                onClick={this.handleLogoutFederated}
              >
                <i className="fas fa-sign-out-alt fa-fw mr-1" /> Log out
                (federated)
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

export default PrivateNavbar;
