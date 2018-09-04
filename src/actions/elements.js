export const ADD_ERROR = 'ADD_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

let errorId = 1;

function nextErrorId() {
  return errorId++;
}

export function addError(message) {
  const errorId = nextErrorId();
  return dispatch => {
    dispatch({
      type: ADD_ERROR,
      error: {
        id: errorId,
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
