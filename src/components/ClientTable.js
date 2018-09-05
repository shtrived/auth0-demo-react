import React from 'react';
import { Button, Table } from 'reactstrap';
import PropTypes from 'prop-types';

import SortIndicator from './shared/SortIndicator';

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
      handleClickReset,
      handleClickClients,
      handleSort,
      ...rest
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
        <Table size="sm">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                Name <SortIndicator column="name" {...rest} />
              </th>
              <th onClick={() => handleSort('description')}>
                Description <SortIndicator column="description" {...rest} />
              </th>
              <th onClick={() => handleSort('client_id')}>
                Client ID <SortIndicator column="client_id" {...rest} />
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.client_id}>
                <td>
                  <div className="media">
                    <img
                      src="https://dummyimage.com/64x64/aaa/fff"
                      className="mr-3"
                      alt="64x64"
                    />
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

export default ClientTable;
