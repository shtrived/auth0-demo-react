import _ from 'lodash';

import { EMPTY_ARRAY, INITIAL_STATE, SORT_DIRECTION } from '../constants';

import {
  CLEAR_ERROR,
  LOAD_CLIENTS_FAILURE,
  LOAD_CLIENTS_REQUEST,
  LOAD_CLIENTS_SUCCESS,
  RESET_CLIENTS,
  SORT_CLIENTS
} from '../actions';

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
    items: _.sortBy(action.items, [sortColumn]),
    sortColumn: sortColumn,
    sortDirection: SORT_DIRECTION.ASC
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
    sortDirection = SORT_DIRECTION.ASC;
  }

  return {
    ...state,
    isFetching: false,
    items: sortedItems,
    sortColumn: action.sortColumn,
    sortDirection: sortDirection
  };

  function invertDirection(sortDirection) {
    return sortDirection === SORT_DIRECTION.ASC
      ? SORT_DIRECTION.DESC
      : SORT_DIRECTION.ASC;
  }
}

function clients(state = INITIAL_STATE, action) {
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
