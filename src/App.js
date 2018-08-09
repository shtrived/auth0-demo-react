import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import EmptyLayout from './components/shared/EmptyLayout';
import PrivateLayout from './components/shared/PrivateLayout';
import PublicLayout from './components/shared/PublicLayout';

import PrivateRoute from './services/PrivateRoute';

import history from './history';
import './App.css';

const App = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <PrivateRoute path="/app" component={PrivateLayout} />
        <Route path="/callback" component={EmptyLayout} />
        <Route component={PublicLayout} />
      </Switch>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
