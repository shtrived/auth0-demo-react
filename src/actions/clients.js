import { addError, clearErrors } from './elements';
import WebApiService from '../services/WebApiService';

export const LOAD_CLIENTS_FAILURE = 'LOAD_CLIENTS_FAILURE';
export const LOAD_CLIENTS_REQUEST = 'LOAD_CLIENTS_REQUEST';
export const LOAD_CLIENTS_SUCCESS = 'LOAD_CLIENTS_SUCCESS';
export const RESET_CLIENTS = 'RESET_CLIENTS';
export const SORT_CLIENTS = 'SORT_CLIENTS';

function loadClientsRequest() {
  return {
    type: LOAD_CLIENTS_REQUEST
  };
}

function loadClientsSuccess(response) {
  return {
    type: LOAD_CLIENTS_SUCCESS,
    items: response.data
  };
}

export function loadClients() {
  let fields = ['app_type', 'client_id', 'description', 'name'];
  return dispatch => {
    dispatch(loadClientsRequest());
    return new WebApiService().getClients(fields).then(
      response => {
        dispatch(clearErrors());
        dispatch(loadClientsSuccess(response));
        // setTimeout(() => {
        //   dispatch(resetClients());
        // }, 5000);
      },
      error => {
        dispatch(addError(error.message));
      }
    );
  };
}

export function resetClients() {
  return dispatch => {
    dispatch(clearErrors());
    dispatch({
      type: RESET_CLIENTS
    });
  };
}

export function sortClients(sortColumn) {
  return dispatch => {
    dispatch(clearErrors());
    dispatch({
      type: SORT_CLIENTS,
      sortColumn: sortColumn
    });
  };
}
