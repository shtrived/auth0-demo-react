import { combineReducers } from 'redux';
import { List } from 'immutable';

import {
  CLEAR_ERROR,
  LOAD_USERS_FAILURE,
  LOAD_USERS_REQUEST,
  LOAD_USERS_SUCCESS,
  RESET_USERS,
  SORT_USERS
} from '../actions';

const initialState = {
  error: undefined,
  isFetching: false,
  items: List(),
  sortColumn: 'user_id',
  sortDirection: 'ascending'
};

function clearError(state, action) {
  return {
    ...state,
    error: undefined
  };
}

function loadUsersFailure(state, action) {
  return {
    ...state,
    error: action.error,
    isFetching: false
  };
}

function loadUsersRequest(state, action) {
  return {
    ...state,
    isFetching: true
  };
}

function loadUsersSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    items: action.items
  };
}

function resetUsers(state, action) {
  return {
    ...state,
    isFetching: false,
    items: action.items
  };
}

function sortUsers(state, action) {
  let sortedItems, sortDirection;

  if (state.sortColumn === action.sortColumn) {
    sortedItems = state.items.reverse();
    sortDirection = invertDirection(state.sortDirection);
  } else {
    sortedItems = state.items.sortBy(item => item[action.sortColumn]);
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

function users(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERROR:
      return clearError(state, action);
    case LOAD_USERS_FAILURE:
      return loadUsersFailure(state, action);
    case LOAD_USERS_REQUEST:
      return loadUsersRequest(state, action);
    case LOAD_USERS_SUCCESS:
      return loadUsersSuccess(state, action);
    case RESET_USERS:
      return resetUsers(state, action);
    case SORT_USERS:
      return sortUsers(state, action);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  users
});

export default rootReducer;
