import WebApiService from '../services/WebApiService';

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const LOAD_CLIENTS_FAILURE = 'LOAD_CLIENTS_FAILURE';
export const LOAD_CLIENTS_REQUEST = 'LOAD_CLIENTS_REQUEST';
export const LOAD_CLIENTS_SUCCESS = 'LOAD_CLIENTS_SUCCESS';
export const RESET_CLIENTS = 'RESET_CLIENTS';
export const SORT_CLIENTS = 'SORT_CLIENTS';

function loadClientsFailure(error) {
  return {
    type: LOAD_CLIENTS_FAILURE,
    error,
  };
}

function loadClientsRequest() {
  return {
    type: LOAD_CLIENTS_REQUEST,
  };
}

function loadClientsSuccess(response) {
  return {
    type: LOAD_CLIENTS_SUCCESS,
    items: response.data,
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR,
  };
}

export function loadClients() {
  let fields = ['app_type', 'client_id', 'description', 'name'];
  return dispatch => {
    dispatch(clearError());
    dispatch(loadClientsRequest());
    new WebApiService()
      .getClients(fields)
      .then(
        response => dispatch(loadClientsSuccess(response)),
        error => dispatch(loadClientsFailure(error))
      );
  };
}

export function resetClients() {
  return dispatch => {
    dispatch(clearError());
    dispatch({
      type: RESET_CLIENTS,
    });
  };
}

export function sortClients(sortColumn) {
  return dispatch => {
    dispatch(clearError());
    dispatch({
      type: SORT_CLIENTS,
      sortColumn: sortColumn,
    });
  };
}
