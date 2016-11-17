// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import {fetchProjects} from './actions/projects';

import './app.global.css';


const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

// pretty sure this is not the right place for this
// fetchProjects()(store.dispatch);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
