// @flow
import storage from 'electron-json-storage';

export const NAME_CONFIG = 'NAME_CONFIG';
export const RECIEVED_CONFIG = 'RECIEVED_CONFIG';
export const DEMO_POPULATE_CONFIG = 'DEMO_POPULATE_CONFIG';

const demoData = {
	'100': {
		projectId: 100,
		name: 'Example Project',
		server: 'express',
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
		}
	},
	'101': {
		projectId: 101,
		name: 'Another Project',
		server: 'proxy',
		sass: {
			enabled: false
		},
		javascript: {
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