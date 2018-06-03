import React from 'react';
import { render } from 'react-dom';

import './index.css';
import App from './App';

import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
