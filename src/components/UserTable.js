import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import UserTableRow from './UserTableRow';

class UsersTable extends React.Component {
  static propTypes = {
    items: PropTypes.instanceOf(Immutable.List).isRequired,
    sortColumn: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    handleClickReset: PropTypes.func.isRequired,
    handleClickUsers: PropTypes.func.isRequired,
    handleSort: PropTypes.func.isRequired
  };

  render() {
    const {
      items,
      sortColumn,
      sortDirection,
      handleClickReset,
      handleClickUsers,
      handleSort
    } = this.props;
    return (
      <React.Fragment>
        <Button
          content="Get Users"
          icon="user"
          labelPosition="left"
          onClick={handleClickUsers}
          primary
        />
        <Button content="Reset" onClick={handleClickReset} />
        <Table celled sortable>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell
                sorted={sortColumn === 'user_id' ? sortDirection : null}
                onClick={() => handleSort('user_id')}
              >
                User Id
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortColumn === 'email' ? sortDirection : null}
                onClick={() => handleSort('email')}
              >
                Email
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortColumn === 'name' ? sortDirection : null}
                onClick={() => handleSort('name')}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortColumn === 'logins_count' ? sortDirection : null}
                onClick={() => handleSort('logins_count')}
              >
                Logins Count
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map(item => <UserTableRow key={item.user_id} {...item} />)}
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}

export default UsersTable;
