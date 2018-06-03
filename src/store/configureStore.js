import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducers from '../reducers';

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  return createStore(
    reducers,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
}
