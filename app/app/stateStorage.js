
import storage from 'electron-json-storage';

const jsonfile = require('jsonfile');

export const SAVE_STATE = 'SAVE_STATE';
export const STATE_SAVED = 'STATE_SAVED';
export const WRITE_WORKFLOWCONFIG = 'WRITE_WORKFLOWCONFIG';
export const WORKFLOWCONFIG_WRITTEN = 'WORKFLOWCONFIG_WRITTEN';

const logIgnoreActionTypes = ['REFRESH_ONLINE_PROJECTS', 'RECIEVED_ONLINE_PROJECTS'];
const defaultData = {
	templates: [
		{
			name: 'Frontend',
			author: 'Stefan',
			desc: 'An example of how to setup the config using all features. Can be used with the gitlab:kuijers.stefan/aw-fullstack repo',
			data: {
				name: 'AW Fullstack',
				watch:  {
					enabled: true,
					globs: [
						'public_html/**/*', 
						'!public_html/**/dist/**/*',
						'bower.json',
					]
				},
				server:  {
					type: 'express',
					target: 'public_html/'
				},
				sass: {
					enabled: true,
					outputDir: 'public_html/style/dist',
					globs: [
						'public_html/style/src/var.scss', 
						'public_html/style/src/**/*.scss'
					]
				},
				javascript: {
					enabled: false,
					outputDir: 'public_html/js/dist',
					globs: [
						'public_html/js/src/index.js',
						'public_html/js/src/**/*.js',
					]
				},
				dependencyManagement: {
					enabled: false
				}
			}
		},
		{
			name: 'Legacy Web Project',
			author: 'Stefan',
			desc: 'An example of using browserSync & file watch in a legacy web project like ACMS2. Remember to first start Vagrant or Docker.',
			data: {
				name: 'Legacy Web Project',
				watch:  {
					enabled: true,
					globs: [
						'*.php', 
						'view/**/*', 
						'view_admin/**/*', 
						'controller/*.php',
						'model/*.php',
						'assets/css/**/*.css',
						'assets/style/**/*.css',
						'assets/js/**/*.js'
					]
				},
				server:  {
					type: 'proxy',
					target: 'project.dev'
				},
				sass: {
					enabled: false,
					outputDir: '',
					globs: []
				},
				javascript: {
					enabled: false,
					outputDir: '',
					globs: []
				},
				dependencyManagement: {
					enabled: false
				}
			}
		}
	]
};
let saveStateDebounce = 0;
let writeFileDebounce = 0;
let writeLogDebounce = 0;
let logQueue = [];


export function getStoredState(key, callback) {
	if (key === 'templates') {
		return defaultData.templates;
	}

	storage.get(key, function(error, data) {
		callback(error ? false : data);
		if (error) console.warn(error);
	});
}

export function stateStorageMiddleware(store) {
  return (next) => (action) => {
    const result = next(action);

    logAction(action);

    switch(action.type) {
	    case SAVE_STATE:
	    	saveState(action.payload, store);

	    	if (action.payload === 'configs') {
		    	dispatchWriteflowConfig(store);
	    	}
	    	break;

	    case WRITE_WORKFLOWCONFIG:
	    	writeWorkflowConfig(action.payload, store);
	    	break;
	}
	
    return result;
  };
};


function saveState(key, store) {
	if (saveStateDebounce) clearTimeout(saveStateDebounce);

	saveStateDebounce = setTimeout(() => {
		const state = store.getState();

		storage.set('projects', state['projects'], function(error) { if (error) throw error; });
		storage.set('profile', state['profile'], function(error) { if (error) throw error; });
		storage.set('configs', state['configs'], function(error) { 
			if (error) throw error; 

			store.dispatch({
				type: STATE_SAVED
			});
		});

		saveStateDebounce = 0;
	}, 1500);
}

function dispatchWriteflowConfig(store) {
	const configs = store.getState().configs;

	store.dispatch({
		type: WRITE_WORKFLOWCONFIG,
		payload: configs[configs.currentConfigId]
	});
}

function writeWorkflowConfig(config, store) {
	if (writeFileDebounce) clearTimeout(writeFileDebounce);

	writeFileDebounce = setTimeout(() => {
		jsonfile.writeFile(
			`${config.path}.workflowconfig`,
			config,
			{spaces: 4},
			() => {
				store.dispatch({
					type: WORKFLOWCONFIG_WRITTEN
				});
			}
		);

		writeFileDebounce = 0;
	}, 1500);
}

export function logAction(action, force = false) {
    if (logIgnoreActionTypes.indexOf(action.type) != -1) return

    if (action.payload === 'Converting circular structure to JSON') return;
    let circulair = false;
    let logPayload;
	try {
		logPayload = JSON.stringify(action.payload || '');
	} catch(err) {
		circulair = true;
	} finally {
		logQueue.push({
			type: action.type,
			time: new Date().toString(),
			payload: circulair ? 
				`CIRCULAIR STRUCTURE: ${Object.keys(action.payload).toString()}` : 
				JSON.parse(logPayload)
		});
	}

	if (logQueue.length > 500) {
		logQueue.shift();
	}

	if (writeLogDebounce) clearTimeout(writeLogDebounce);
	
	writeLogDebounce = setTimeout(
		() => {writeLog(force)}, 
		0
		// force ? 0 : 1000
	);

}

function writeLog(force = false) {
	const logFileName = force ? `log.error.${Date.now()}` : 'log';
	console.log(logQueue);
	storage.set(logFileName, logQueue);

	writeLogDebounce = 0;
}
