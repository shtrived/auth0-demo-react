import React from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { clearErrors } from '../actions/elements';

class ContainerErrors extends React.Component {
  static propTypes = {
    errors: PropTypes.array.isRequired,
    handleClickReset: PropTypes.func.isRequired
  };

  render() {
    const { errors, handleClickReset } = this.props;
    if (errors && errors.length > 0) {
      return (
        <Alert color="danger" fade={false} toggle={handleClickReset}>
          <h4 className="alert-heading">Alert</h4>
          <p>Please review the following messages:</p>
          <ul>
            {errors.map(error => (
              <li key={error.id}>{error.message}</li>
            ))}
          </ul>
        </Alert>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  errors: state.elements.errors
});

const mapDispatchToProps = dispatch => ({
  handleClickReset: e => {
    e.preventDefault();
    dispatch(clearErrors());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainerErrors);
