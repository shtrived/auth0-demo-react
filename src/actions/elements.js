import { uuidv4 } from '../utils/RandomUtils';

export const ADD_ERROR = 'ADD_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export function addError(message) {
  return dispatch => {
    dispatch({
      type: ADD_ERROR,
      error: {
        id: uuidv4.create(),
        message: message
      }
    });
  };
}

export function clearErrors() {
  return dispatch => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };
}
