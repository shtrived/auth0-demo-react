import { combineReducers } from 'redux';
import clients from './clients';
import elements from './elements';

const rootReducer = combineReducers({
  clients,
  elements
});

export default rootReducer;
