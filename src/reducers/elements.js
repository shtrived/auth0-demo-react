import { EMPTY_ARRAY, INITIAL_STATE_ERRORS } from '../constants';
import { ADD_ERROR, CLEAR_ERRORS } from '../actions/elements';

function addError(state, action) {
  return {
    ...state,
    errors: [...state.errors.slice(), action.error]
  };
}

function clearErrors(state, action) {
  return {
    ...state,
    errors: EMPTY_ARRAY
  };
}

function elements(state = INITIAL_STATE_ERRORS, action) {
  switch (action.type) {
    case ADD_ERROR:
      return addError(state, action);
    case CLEAR_ERRORS:
      return clearErrors(state, action);
    default:
      return state;
  }
}

export default elements;
