import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadClients, resetClients, sortClients } from '../actions/clients';

import ClientTable from '../components/ClientTable';

class Clients extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    sortColumn: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    handleClickReset: PropTypes.func.isRequired,
    handleClickClients: PropTypes.func.isRequired,
    handleResetClients: PropTypes.func.isRequired,
    handleSort: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.props.handleResetClients();
  }

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
      <ClientTable
        items={items}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        handleClickReset={handleClickReset}
        handleClickClients={handleClickClients}
        handleSort={handleSort}
      />
    );
  }
}

const mapStateToProps = state => ({
  items: state.clients.items,
  sortColumn: state.clients.sortColumn,
  sortDirection: state.clients.sortDirection
});

const mapDispatchToProps = dispatch => ({
  handleClickReset: e => {
    e.preventDefault();
    dispatch(resetClients());
  },
  handleClickClients: e => {
    e.preventDefault();
    dispatch(loadClients());
  },
  handleResetClients: () => {
    dispatch(resetClients());
  },
  handleSort: clickedColumn => {
    dispatch(sortClients(clickedColumn));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clients);
