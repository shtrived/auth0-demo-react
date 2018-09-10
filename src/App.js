import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import LayoutEmpty from './components/shared/LayoutEmpty';
import LayoutPrivate from './components/shared/LayoutPrivate';
import LayoutPublic from './components/shared/LayoutPublic';

import RoutePrivate from './components/shared/RoutePrivate';

import history from './history';
import './App.css';

const App = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <RoutePrivate path="/app" component={LayoutPrivate} />
        <Route path="/callback" component={LayoutEmpty} />
        <Route component={LayoutPublic} />
      </Switch>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
