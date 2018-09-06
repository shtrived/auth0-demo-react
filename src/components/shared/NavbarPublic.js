import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Nav, NavItem, NavLink } from 'reactstrap';

import authorizationService from '../../services/AuthorizationService';

class NavbarPublic extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleLogin() {
    authorizationService.login();
  }

  handleSignup() {
    authorizationService.signup();
  }

  render() {
    return (
      <React.Fragment>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/about-us">
              About Us
            </NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Button
              className="nav-link"
              color="link"
              onClick={this.handleSignup}
            >
              <i className="fas fa-user mr-1" /> Sign up
            </Button>
          </NavItem>
          <NavItem>
            <Button
              className="nav-link"
              color="link"
              onClick={this.handleLogin}
            >
              <i className="fas fa-sign-in-alt mr-1" /> Log in
            </Button>
          </NavItem>
        </Nav>
      </React.Fragment>
    );
  }
}

export default NavbarPublic;
