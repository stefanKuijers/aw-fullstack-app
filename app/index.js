// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import {fetchProjects} from './actions/projects';
import {fetchConfig} from './actions/configs';

import './app.global.css';


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
