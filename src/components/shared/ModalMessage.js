import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

class ModalMessage extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
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
    const { children, isOpen } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={this.handleToggle}>
        <ModalHeader toggle={this.handleToggle}>
          Please review the following message:
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleToggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalMessage;
