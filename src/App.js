import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthorizedLayout from './components/shared/AuthorizedLayout';
import EmptyLayout from './components/shared/EmptyLayout';
import PublicLayout from './components/shared/PublicLayout';

import AuthorizedRoute from './services/AuthorizedRoute';

import history from './history';
import './App.css';

const App = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <AuthorizedRoute path="/app" component={AuthorizedLayout} />
        <Route path="/callback" component={EmptyLayout} />
        <Route component={PublicLayout} />
      </Switch>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
