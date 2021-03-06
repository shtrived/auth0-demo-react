import React from 'react';
import { Button, Table } from 'reactstrap';
import PropTypes from 'prop-types';

import SortIndicator from './shared/SortIndicator';

const propTypes = {
  handleClickClients: PropTypes.func.isRequired,
  handleClickReset: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  sortColumn: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired
};

class Applications extends React.Component {
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
        <div className="py-3">
          <h2>Applications</h2>
          <p className="lead">
            Retrieves a list of current applications registered with your
            tenant.
          </p>
        </div>
        <div className="mb-3">
          <Button className="mr-2" color="primary" onClick={handleClickClients}>
            Get Applications
          </Button>
          <Button color="secondary" onClick={handleClickReset}>
            Reset
          </Button>
        </div>
        <Table>
          <thead>
            <tr>
              <th
                data-column="name"
                onClick={handleSort}
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
                data-column="description"
                onClick={handleSort}
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
                data-column="client_id"
                onClick={handleSort}
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
                      <h6 className="mt-1">{item.name}</h6>
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

Applications.propTypes = propTypes;

export default Applications;
