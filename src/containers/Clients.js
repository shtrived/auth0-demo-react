import React from 'react';
import PropTypes from 'prop-types';
import { Container, Icon, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { loadClients, resetClients, sortClients } from '../actions';

import ClientTable from '../components/ClientTable';

class Clients extends React.Component {
  static propTypes = {
    error: PropTypes.object,
    items: PropTypes.array.isRequired,
    sortColumn: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    handleClickReset: PropTypes.func.isRequired,
    handleClickClients: PropTypes.func.isRequired,
    handleResetClients: PropTypes.func.isRequired,
    handleSort: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.handleResetClients();
  }

  render() {
    const {
      error,
      items,
      sortColumn,
      sortDirection,
      handleClickReset,
      handleClickClients,
      handleSort
    } = this.props;
    return (
      <Container style={{ marginTop: '7em' }}>
        {error && (
          <Message icon error>
            <Icon name="warning circle" />
            <Message.Content>
              <Message.Header>{error.message}</Message.Header>
              <p>{error.response.data.message}</p>
            </Message.Content>
          </Message>
        )}
        <ClientTable
          items={items}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          handleClickReset={handleClickReset}
          handleClickClients={handleClickClients}
          handleSort={handleSort}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  error: state.clients.error,
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
