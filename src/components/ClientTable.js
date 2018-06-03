import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ClientTableRow from './ClientTableRow';

class ClientTable extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    sortColumn: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    handleClickReset: PropTypes.func.isRequired,
    handleClickClients: PropTypes.func.isRequired,
    handleSort: PropTypes.func.isRequired
  };

  render() {
    const {
      items,
      sortColumn,
      sortDirection,
      handleClickReset,
      handleClickClients,
      handleSort
    } = this.props;
    return (
      <React.Fragment>
        <Button
          content="Get Clients"
          icon="window restore"
          labelPosition="left"
          onClick={handleClickClients}
          primary
        />
        <Button content="Reset" onClick={handleClickReset} />
        <Table celled sortable>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell
                sorted={sortColumn === 'name' ? sortDirection : null}
                onClick={() => handleSort('name')}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortColumn === 'description' ? sortDirection : null}
                onClick={() => handleSort('description')}
              >
                Description
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortColumn === 'client_id' ? sortDirection : null}
                onClick={() => handleSort('client_id')}
              >
                Client ID
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map(item => (
              <ClientTableRow key={item.client_id} {...item} />
            ))}
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}

export default ClientTable;
