import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalSimple extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    message: PropTypes.string,
    onToggle: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    const { onToggle } = this.props;
    onToggle();
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.handleToggle}>
        <ModalHeader toggle={this.handleToggle}>
          Please review the following message:
        </ModalHeader>
        <ModalBody>{this.props.message}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleToggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalSimple;
