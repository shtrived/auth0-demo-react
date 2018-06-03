import React from 'react';
import PropTypes from 'prop-types';
import { Container, Icon, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import { loadUsers, resetUsers, sortUsers } from '../actions';

import UserTable from '../components/UserTable';

class Users extends React.Component {
  static propTypes = {
    error: PropTypes.object,
    items: PropTypes.instanceOf(Immutable.List).isRequired,
    sortColumn: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    handleClickReset: PropTypes.func.isRequired,
    handleClickUsers: PropTypes.func.isRequired,
    handleResetUsers: PropTypes.func.isRequired,
    handleSort: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.handleResetUsers();
  }

  render() {
    const {
      error,
      items,
      sortColumn,
      sortDirection,
      handleClickReset,
      handleClickUsers,
      handleSort
    } = this.props;
    return (
      <Container style={{ marginTop: '7em' }}>
        {error && (
          <Message icon error>
            <Icon name="warning circle" />
            <Message.Content>
              <Message.Header>{error.message}</Message.Header>
              <pre>{error.stack}</pre>
            </Message.Content>
          </Message>
        )}
        <UserTable
          items={items}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          handleClickReset={handleClickReset}
          handleClickUsers={handleClickUsers}
          handleSort={handleSort}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  error: state.users.error,
  items: state.users.items,
  sortColumn: state.users.sortColumn,
  sortDirection: state.users.sortDirection
});

const mapDispatchToProps = dispatch => ({
  handleClickReset: e => {
    e.preventDefault();
    dispatch(resetUsers());
  },
  handleClickUsers: e => {
    e.preventDefault();
    dispatch(loadUsers());
  },
  handleResetUsers: () => {
    dispatch(resetUsers());
  },
  handleSort: clickedColumn => {
    dispatch(sortUsers(clickedColumn));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
