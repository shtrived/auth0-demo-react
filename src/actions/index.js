import { List } from 'immutable';

import WebApiService from '../services/WebApiService';

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const LOAD_USERS_FAILURE = 'LOAD_USERS_FAILURE';
export const LOAD_USERS_REQUEST = 'LOAD_USERS_REQUEST';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const RESET_USERS = 'RESET_USERS';
export const SORT_USERS = 'SORT_USERS';

function loadUsersFailure(error) {
  return {
    type: LOAD_USERS_FAILURE,
    error
  };
}

function loadUsersRequest() {
  return {
    type: LOAD_USERS_REQUEST
  };
}

function loadUsersSuccess(response) {
  return {
    type: LOAD_USERS_SUCCESS,
    items: List(response.data)
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR
  };
}

export function loadUsers() {
  return function(dispatch) {
    dispatch(clearError());
    dispatch(loadUsersRequest());
    new WebApiService()
      .getUsers()
      .then(
        response => dispatch(loadUsersSuccess(response)),
        error => dispatch(loadUsersFailure(error))
      );
  };
}

export function resetUsers() {
  return function(dispatch) {
    dispatch(clearError());
    dispatch({
      type: RESET_USERS,
      items: List()
    });
  };
}

export function sortUsers(sortColumn) {
  return function(dispatch) {
    dispatch(clearError());
    dispatch({
      type: SORT_USERS,
      sortColumn: sortColumn
    });
  };
}
