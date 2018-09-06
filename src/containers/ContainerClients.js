import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadClients, resetClients, sortClients } from '../actions/clients';

import Clients from '../components/Clients';

class ContainerClients extends React.Component {
  static propTypes = {
    handleClickClients: PropTypes.func.isRequired,
    handleClickReset: PropTypes.func.isRequired,
    handleResetClients: PropTypes.func.isRequired,
    handleSort: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    sortColumn: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.props.handleResetClients();
  }

  render() {
    return <Clients {...this.props} />;
  }
}

const mapStateToProps = state => {
  const { clients } = state;
  const { items, sortColumn, sortDirection } = clients;
  return {
    items: items,
    sortColumn: sortColumn,
    sortDirection: sortDirection
  };
};

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
)(ContainerClients);
