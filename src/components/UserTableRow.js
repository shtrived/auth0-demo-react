import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const propTypes = {
  user_id: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
  logins_count: PropTypes.number
};

function UserTableRow(props) {
  const { user_id, email, name, logins_count } = props;
  return (
    <Table.Row key={user_id.toString()}>
      <Table.Cell>
        <Icon name="user" />
        {user_id}
      </Table.Cell>
      <Table.Cell>{email}</Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{logins_count}</Table.Cell>
    </Table.Row>
  );
}

UserTableRow.propTypes = propTypes;

export default UserTableRow;
