import React, { Component } from 'react';
import { Button, Header, Modal, Transition } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ModalSimple extends Component {
  static propTypes = {
    message: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool,
  };

  render() {
    const { message, onClose, open } = this.props;
    return (
      <Transition animation="fade down" duration={500} visible={open}>
        <Modal
          centered={false}
          dimmer={true}
          onClose={onClose}
          open={open}
          size="small"
        >
          <Header
            content="Please review the following message:"
            icon="info circle"
          />
          <Modal.Content>
            <p>{message}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button content="OK" icon="checkmark" onClick={onClose} positive />
          </Modal.Actions>
        </Modal>
      </Transition>
    );
  }
}

export default ModalSimple;
