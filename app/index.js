// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { remote } from 'electron';

import routes from './app/routes';
import configureStore from './app/store/configureStore';
import { fetchProjects } from './projectList/project.actions';
import { fetchConfig } from './config/config.actions';
import { logAction } from './app/stateStorage';



const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
let offlineMessageTimeout = false;

function init() {
	remote.app.setName('ArtFlow');
	remote.app.setVersion('0.13.4');
	
	// pretty sure this is not the right place for this
	// leaving it here for now as both views depend on 
	// this data being present
	fetchProjects(true)(store.dispatch, store.getState);
	fetchConfig(null)(store.dispatch, store.getState);

	process.on('uncaughtException', onError);
}

export function onError(error) {

	if (error.message != 'Network Error') {
	    logAction({
	    	type: 'APPLICATION_ERROR',
	    	payload: error.message
	    }, true);
	} else {
		if (offlineMessageTimeout) clearTimeout(offlineMessageTimeout);

		offlineMessageTimeout = setTimeout(() => {
			document.getElementById('toggle-error').checked = false; // hide the no internet error
			offlineMessageTimeout = false;
		}, 6000);
	}

	showError(error);

	// if (process.env.NODE_ENV === 'development') throw error;
}

function showError(error) {
	const message = error.message === 'Network Error' ? 'No internet connection' : error.message;
	document.getElementById('app-error-title').innerHTML = `${remote.app.getName()} (${remote.app.getVersion()}) | has encountered an error`;
    document.getElementById('app-error-message').innerHTML = message;
    document.getElementById('toggle-error').checked = true;
}




init();

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

