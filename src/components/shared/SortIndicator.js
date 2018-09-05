import React from 'react';
import PropTypes from 'prop-types';

import { SORT_DIRECTION } from '../../constants';

SortIndicator.propTypes = {
  column: PropTypes.string.isRequired,
  sortColumn: PropTypes.string.isRequired,
  sortDirection: PropTypes.oneOf(Object.values(SORT_DIRECTION))
};

function SortIndicator({ column, sortColumn, sortDirection }) {
  return (
    <React.Fragment>
      {sortColumn === column ? (
        sortDirection === SORT_DIRECTION.ASC ? (
          <i className="fas fa-caret-up" />
        ) : (
          <i className="fas fa-caret-down" />
        )
      ) : null}
    </React.Fragment>
  );
}

export default SortIndicator;
