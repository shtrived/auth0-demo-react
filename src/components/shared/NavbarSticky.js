import React from 'react';
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

const propTypes = {
  private: PropTypes.bool
};

class NavbarSticky extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.handleCollapseToggle = this.handleCollapseToggle.bind(this);
    this.state = {
      collapseIsOpen: false,
      modalIsOpen: false,
      modalMessage: null
    };
  }

  handleChangePassword(message) {
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
            <NavbarBrand>
              <img
                className="align-top d-inline-block mr-2"
                height="30"
                src={logo}
                alt=""
              />
              Auth0 Demo
            </NavbarBrand>
            <NavbarToggler onClick={this.handleCollapseToggle} />
            <Collapse isOpen={this.state.collapseIsOpen} navbar>
              {this.props.private ? (
                <NavbarPrivate onPasswordChange={this.handleChangePassword} />
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

NavbarSticky.propTypes = propTypes;

export default NavbarSticky;
