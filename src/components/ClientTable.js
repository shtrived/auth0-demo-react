import React from 'react';
import { Button, Table } from 'reactstrap';
import PropTypes from 'prop-types';

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
        <div className="mb-3">
          <Button className="mr-1" color="primary" onClick={handleClickClients}>
            Get Clients
          </Button>
          <Button color="secondary" onClick={handleClickReset}>
            Reset
          </Button>
        </div>
        <Table>
          <thead>
            <tr>
              <th
                sorted={sortColumn === 'name' ? sortDirection : null}
                onClick={() => handleSort('name')}
              >
                Name
              </th>
              <th
                sorted={sortColumn === 'description' ? sortDirection : null}
                onClick={() => handleSort('description')}
              >
                Description
              </th>
              <th
                sorted={sortColumn === 'client_id' ? sortDirection : null}
                onClick={() => handleSort('client_id')}
              >
                Client ID
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.client_id}>
                <td>
                  {item.name}
                  <br />
                  {item.app_type || 'none'}
                </td>
                <td>{item.description}</td>
                <td>{item.client_id}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

export default ClientTable;
