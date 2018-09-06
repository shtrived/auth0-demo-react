import React from 'react';
import { Button, Table } from 'reactstrap';
import PropTypes from 'prop-types';

import SortIndicator from './shared/SortIndicator';

class Clients extends React.Component {
  static propTypes = {
    handleClickClients: PropTypes.func.isRequired,
    handleClickReset: PropTypes.func.isRequired,
    handleSort: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    sortColumn: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired
  };

  render() {
    const {
      handleClickClients,
      handleClickReset,
      handleSort,
      items,
      sortColumn,
      sortDirection
    } = this.props;
    return (
      <React.Fragment>
        <div className="mb-3">
          <Button className="mr-2" color="primary" onClick={handleClickClients}>
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
                onClick={() => handleSort('name')}
                scope="col"
                style={{ cursor: 'pointer', width: '30%' }}
              >
                Name{' '}
                <SortIndicator
                  column="name"
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                />
              </th>
              <th
                onClick={() => handleSort('description')}
                scope="col"
                style={{ cursor: 'pointer', width: '30%' }}
              >
                Description{' '}
                <SortIndicator
                  column="description"
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                />
              </th>
              <th
                onClick={() => handleSort('client_id')}
                scope="col"
                style={{ cursor: 'pointer', width: '40%' }}
              >
                Client ID{' '}
                <SortIndicator
                  column="client_id"
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.client_id}>
                <td>
                  <div className="media">
                    <span className="badge rounded-circle mr-3">RD</span>
                    <div className="media-body">
                      <h5 className="mt-0">{item.name}</h5>
                      {item.app_type || 'none'}
                    </div>
                  </div>
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

export default Clients;
