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

import ModalMessage from './ModalMessage';
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
    this.handleCollapseToggle = this.handleCollapseToggle.bind(this);
    this.state = {
      collapseIsOpen: false,
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

  handleCollapseToggle() {
    this.setState({
      collapseIsOpen: !this.state.collapseIsOpen
    });
  }

  render() {
    return (
      <React.Fragment>
        <ModalMessage
          isOpen={this.state.modalIsOpen}
          onToggle={this.handleModalToggle}
        >
          {this.state.modalMessage}
        </ModalMessage>
        <Navbar color="light" expand="md" fixed="top" light>
          <Container>
            <NavbarBrand tag={Link} to="/">
              <img src={logo} className="mr-1" height="30" alt="" /> Auth0 Demo
            </NavbarBrand>
            <NavbarToggler onClick={this.handleCollapseToggle} />
            <Collapse isOpen={this.state.collapseIsOpen} navbar>
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
