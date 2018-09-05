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
                      src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_165a80b681f%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_165a80b681f%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2213.84375%22%20y%3D%2236.65%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
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
