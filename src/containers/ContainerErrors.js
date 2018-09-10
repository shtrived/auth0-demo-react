import React from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { clearErrors } from '../actions/elements';

const propTypes = {
  errors: PropTypes.array.isRequired,
  handleClickReset: PropTypes.func.isRequired
};

class ContainerErrors extends React.Component {
  render() {
    const { errors, handleClickReset } = this.props;
    if (errors && errors.length > 0) {
      return (
        <Alert color="danger" fade={false} toggle={handleClickReset}>
          <h5 className="alert-heading">Alert</h5>
          <p>Please review the following messages:</p>
          <ErrorList errors={errors} />
        </Alert>
      );
    } else {
      return null;
    }
  }
}

ContainerErrors.propTypes = propTypes;

const ErrorItem = props => {
  const { value } = props;
  return <li>{value}</li>;
};

const ErrorList = props => {
  const { errors } = props;
  const errorItems = errors.map(error => (
    <ErrorItem key={error.id} value={error.message} />
  ));
  return <ul>{errorItems}</ul>;
};

const mapStateToProps = state => {
  const { elements } = state;
  const { errors } = elements;
  return {
    errors: errors
  };
};

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
