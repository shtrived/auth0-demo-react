import React from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand
} from 'reactstrap';
import PropTypes from 'prop-types';

import ModalSimple from './ModalSimple';
import NavbarPrivate from './NavbarPrivate';
import NavbarPublic from './NavbarPublic';

import logo from '../../images/logo.png';

class NavbarSticky extends React.Component {
  static propTypes = {
    private: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      isOpen: false,
      modalIsOpen: false,
      modalMessage: null
    };
  }

  handlePasswordChange(message) {
    this.setState({
      modalIsOpen: true,
      modalMessage: message
    });
  }

  handleModalToggle() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  handleToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <React.Fragment>
        <ModalSimple
          isOpen={this.state.modalIsOpen}
          message={this.state.modalMessage}
          onToggle={this.handleModalToggle}
        />
        <Navbar color="light" expand="md" fixed="top" light>
          <Container>
            <NavbarBrand tag={Link} to="/">
              <img src={logo} className="mr-1" height="30" alt="" /> Auth0 Demo
            </NavbarBrand>
            <NavbarToggler onClick={this.handleToggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              {this.props.private ? (
                <NavbarPrivate onPasswordChange={this.handlePasswordChange} />
              ) : (
                <NavbarPublic />
              )}
            </Collapse>
          </Container>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default NavbarSticky;
