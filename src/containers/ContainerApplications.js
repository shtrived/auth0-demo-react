import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadClients, resetClients, sortClients } from '../actions/clients';

import Applications from '../components/Applications';

const propTypes = {
  handleClickClients: PropTypes.func.isRequired,
  handleClickReset: PropTypes.func.isRequired,
  handleResetClients: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  sortColumn: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired
};

class ContainerApplications extends React.Component {
  constructor(props) {
    super(props);
    this.props.handleResetClients();
  }

  render() {
    return <Applications {...this.props} />;
  }
}

ContainerApplications.propTypes = propTypes;

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
  handleSort: e => {
    const column = e.target.dataset.column;
    dispatch(sortClients(column));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainerApplications);
