import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Message } from 'semantic-ui-react';

class ErrorMessage extends React.Component {
  static propTypes = {
    error: PropTypes.object,
  };

  render() {
    const { error } = this.props;
    return error ? (
      <Message icon error>
        <Icon name="warning circle" />
        <Message.Content>
          <Message.Header>{error.message}</Message.Header>
          <p>{error.response.data.message}</p>
        </Message.Content>
      </Message>
    ) : null;
  }
}

export default ErrorMessage;
