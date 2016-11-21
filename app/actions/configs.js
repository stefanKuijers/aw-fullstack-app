// @flow
import storage from 'electron-json-storage';

export const RECIEVED_CONFIG = 'RECIEVED_CONFIG';
export const SET_PROPERTY = 'SET_PROPERTY';
export const SET_ROOT_PROPERTY = 'SET_ROOT_PROPERTY';
export const SET_GLOB = 'SET_GLOB';

const demoData = {
	'100': {
		id: 100,
		projectId: 100,
		name: 'Example Project',
		path: 'C:/arteries/webroot/projectName',
		server:  {
			type: 'express',
			target: './public_html'
		},
		sass: {
			enabled: true,
			outputDir: './public_html/style/dist',
			globs: [
				'foo/**/*', 
				'bar/foo/*.scss'
			]
		},
		javascript: {
			enabled: false,
			outputDir: './public_html/js/dist',
			globs: []
		},
		dependencyManagement: {
			enabled: false
		}
	},
	'101': {
		id: 101,
		projectId: 101,
		name: 'Another Project',
		path: '',
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
};

export function fetchConfig(id) {
	console.warn('Should only get config if it does not exist yet. FETCH ONCE');
	return (dispatch: Function, getState: Function) => {
	    storage.get(getConfigKey(id),  function(error, data) {
			if (error) throw error;

			if (data.id) {
				dispatch(recievedConfig(data));
			} else {
				dispatch(recievedConfig(demoData[id]));
			}
		});
	}
}

export function recievedConfig(config) {
	return {
		type: RECIEVED_CONFIG,
		payload: config
	};
}

export function updateProperty(key, property, newValue, globIndex = false) {
	return (dispatch: Function, getState: Function) => {
		const state = getState();

		if (globIndex !== false) {
			dispatch(setGlob(key, property, newValue, globIndex));
		} else if (!property) {
		    dispatch(setRootProperty(key, newValue, state.configs.currentConfigId));
		} else {
		    dispatch(setProperty(key, property, newValue));
		}

		// setTimeout(() => {
		// 	saveConfig(state.config);
		// }, 300);
	}
}

export function setGlob(key, property, newValue, globIndex) {
	return {
		type: SET_GLOB,
		payload: { key, property, newValue, globIndex }
	};
}

export function setProperty(key, property, newValue) {
	return {
		type: SET_PROPERTY,
		payload: { key, property, newValue}
	};
}

export function setRootProperty(key, newValue, projectId) {
	return {
		type: SET_ROOT_PROPERTY,
		payload: { key, newValue, projectId }
	};
}

function saveConfig(config) {
	console.warn('saveConfig chould save the whole configs object');
	storage.set(getConfigKey(config.id), config, function(error) {
		if (error) throw error;
	});
}

function getConfigKey(id) {
	return 'config'+id;
}