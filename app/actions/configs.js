// @flow
import storage from 'electron-json-storage';
import { setProjectName } from './projects.js';

export const RECIEVED_CONFIGS = 'RECIEVED_CONFIGS';
export const SET_CURRENT_CONFIG_ID = 'SET_CURRENT_CONFIG_ID';
export const SET_PROPERTY = 'SET_PROPERTY';
export const SET_ROOT_PROPERTY = 'SET_ROOT_PROPERTY';
export const SET_GLOB = 'SET_GLOB';
export const ADD_GLOB = 'ADD_GLOB';
export const REMOVE_GLOB = 'REMOVE_GLOB';
export const MOVE_GLOB = 'MOVE_GLOB';

const demoData = {
	currentConfigId: 100,
	'100': {
		id: 100,
		projectId: 100,
		name: 'AW Fullstack',
		path: 'C:/Users/Felhasznalo/dev/aw-fullstack/',
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
	},
	'101': {
		id: 101,
		projectId: 101,
		name: 'Another Project',
		path: '',
		watch:  {
			enabled: true,
			globs: []
		},
		server:  {
			type: 'proxy',
			target: 'project.dev'
		},
		sass: {
			enabled: false,
			outputDir: '',
			fontsDir: '',
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
	return (dispatch: Function, getState: Function) => {
		dispatch(setCurrentConfigId(id));

		if (getState && getState().configs[id]) {
			dispatch(recievedConfigs(getState().configs, id));
		} else {
		    storage.get('configs', function(error, data) {
				if (error) throw error;
				// const data = {};
				console.warn('RECIEVED_CONFIGS providing demoData in case user has no data');
				// data.currentConfigId = false; // to force reload from demoData
				dispatch(recievedConfigs(data.currentConfigId ? data : demoData, id));
			});
		}
	}
}

export function setCurrentConfigId(currentConfigId) {
	return {
		type: SET_CURRENT_CONFIG_ID,
		payload: currentConfigId
	};
}

export function recievedConfigs(configs, currentConfigId) {
	return {
		type: RECIEVED_CONFIGS,
		payload: { configs, currentConfigId }
	};
}

export function updateProperty(key, property, newValue, globIndex = false) {
	return (dispatch: Function, getState: Function) => {
		let state = getState();

		if (property === 'globs') {
			dispatch(setGlob(key, property, newValue, globIndex));
		} else if (!property) {
		    dispatch(setRootProperty(key, newValue, state.configs.currentConfigId));
		    if (key === 'name') {
		    	dispatch(setProjectName(state.configs.currentConfigId, newValue));
		    }
		} else {
		    dispatch(setProperty(key, property, newValue));
		}

		setTimeout(() => {
			saveState(getState().configs);
		}, 500);
	}
}

export function setGlob(key, property, newValue, globIndex) {
	return {
		type: SET_GLOB,
		payload: { key, property, newValue, globIndex }
	};
}

export function addGlob(configId, key) {
	return {
		type: ADD_GLOB,
		payload: { configId, key }
	};
}

export function removeGlob(configId, key, index) {
	return {
		type: REMOVE_GLOB,
		payload: { configId, key, index }
	};
}

export function moveGlob(configId, key, index, newIndex) {
	return {
		type: MOVE_GLOB,
		payload: { configId, key, index, newIndex }
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

function saveState(configs) {
	storage.set('configs', configs, function(error) {
		if (error) throw error;
	});
}