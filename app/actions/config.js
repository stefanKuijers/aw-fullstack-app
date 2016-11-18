// @flow
import storage from 'electron-json-storage';

export const NAME_CONFIG = 'NAME_CONFIG';
export const RECIEVED_CONFIG = 'RECIEVED_CONFIG';
export const TOGGLE_FEATURE = 'TOGGLE_FEATURE';
export const SET_SERVER_TYPE = 'SET_SERVER_TYPE';

const demoData = {
	'100': {
		projectId: 100,
		name: 'Example Project',
		server:  {
			type: 'express',
			target: './public_html'
		},
		sass: {
			enabled: true,
			dir: '',
			globs: [
				'foo/**/*', 
				'bar/foo/*.scss'
			]
		},
		javascript: {
			enabled: false,
			dir: '',
			globs: []
		},
		dependencyManagement: {
			enabled: false
		}
	},
	'101': {
		projectId: 101,
		name: 'Another Project',
		server:  {
			type: 'proxy',
			target: 'project.dev'
		},
		sass: {
			enabled: false
		},
		javascript: {
			enabled: false
		},
		dependencyManagement: {
			enabled: false
		}
	}
};

export function fetchConfig(id) {
	return (dispatch: Function, getState: Function) => {
	    storage.get('config'+id,  function(error, data) {
			if (error) throw error;

			if (data.id) {
				dispatch(recievedConfig(data));
			} else {
				dispatch(recievedConfig(demoData[id]));
			}
		});
	}
}

export function setName(name) {
	return {
		type: NAME_CONFIG,
		payload: name
	};
}

export function recievedConfig(config) {
	return {
		type: RECIEVED_CONFIG,
		payload: config
	};
}

export function toggleFeature(feature) {
	return {
		type: TOGGLE_FEATURE,
		payload: feature
	};
}

export function setServerType(event, serverType) {
	return {
		type: SET_SERVER_TYPE,
		payload: serverType
	};
}