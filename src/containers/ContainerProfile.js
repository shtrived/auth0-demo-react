import React from 'react';

import Profile from '../components/Profile';

const propTypes = {};

class ContainerProfile extends React.Component {
  render() {
    return <Profile {...this.props} />;
  }
}

ContainerProfile.propTypes = propTypes;

// const mapStateToProps = state => {
//   const { clients } = state;
//   const { items, sortColumn, sortDirection } = clients;
//   return {
//     items: items,
//     sortColumn: sortColumn,
//     sortDirection: sortDirection
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   handleClickReset: e => {
//     e.preventDefault();
//     dispatch(resetClients());
//   },
//   handleClickClients: e => {
//     e.preventDefault();
//     dispatch(loadClients());
//   },
//   handleResetClients: () => {
//     dispatch(resetClients());
//   },
//   handleSort: e => {
//     const column = e.target.dataset.column;
//     dispatch(sortClients(column));
//   }
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ContainerApplications);

export default ContainerProfile;
