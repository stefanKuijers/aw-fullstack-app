// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from './app/routes';
import configureStore from './app/store/configureStore';
import {fetchProjects} from './projectList/project.actions';
import {fetchConfig} from './config/config.actions';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

// pretty sure this is not the right place for this
// leaving it here for now as both views depend on 
// this data being present
fetchProjects(true)(store.dispatch, store.getState);
fetchConfig(null)(store.dispatch, store.getState);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

