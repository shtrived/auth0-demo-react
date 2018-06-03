import _ from 'lodash';

import {
  CLEAR_ERROR,
  LOAD_CLIENTS_FAILURE,
  LOAD_CLIENTS_REQUEST,
  LOAD_CLIENTS_SUCCESS,
  RESET_CLIENTS,
  SORT_CLIENTS
} from '../actions';

const EMPTY_ARRAY = [];

const initialState = {
  error: undefined,
  isFetching: false,
  items: EMPTY_ARRAY,
  sortColumn: 'name',
  sortDirection: 'ascending'
};

function clearError(state, action) {
  return {
    ...state,
    error: undefined
  };
}

function loadClientsFailure(state, action) {
  return {
    ...state,
    error: action.error,
    isFetching: false
  };
}

function loadClientsRequest(state, action) {
  return {
    ...state,
    isFetching: true
  };
}

function loadClientsSuccess(state, action) {
  const sortColumn = 'name';

  return {
    ...state,
    isFetching: false,
    items: _.sortBy(action.items, [sortColumn])
  };
}

function resetClients(state, action) {
  return {
    ...state,
    isFetching: false,
    items: EMPTY_ARRAY
  };
}

function sortClients(state, action) {
  let clonedItems, sortedItems, sortDirection;

  // clone to avoid mutating state via reverse, sortBy
  clonedItems = _.clone(state.items);
  if (state.sortColumn === action.sortColumn) {
    sortedItems = _.reverse(clonedItems);
    sortDirection = invertDirection(state.sortDirection);
  } else {
    sortedItems = _.sortBy(clonedItems, [action.sortColumn]);
    sortDirection = 'ascending';
  }

  return {
    ...state,
    isFetching: false,
    items: sortedItems,
    sortColumn: action.sortColumn,
    sortDirection: sortDirection
  };

  function invertDirection(sortDirection) {
    return sortDirection === 'ascending' ? 'descending' : 'ascending';
  }
}

function clients(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERROR:
      return clearError(state, action);
    case LOAD_CLIENTS_FAILURE:
      return loadClientsFailure(state, action);
    case LOAD_CLIENTS_REQUEST:
      return loadClientsRequest(state, action);
    case LOAD_CLIENTS_SUCCESS:
      return loadClientsSuccess(state, action);
    case RESET_CLIENTS:
      return resetClients(state, action);
    case SORT_CLIENTS:
      return sortClients(state, action);
    default:
      return state;
  }
}

export default clients;
