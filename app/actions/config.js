// @flow
import storage from 'electron-json-storage';

export const NAME_CONFIG = 'NAME_CONFIG';
export const RECIEVED_CONFIG = 'RECIEVED_CONFIG';
export const TOGGLE_FEATURE = 'TOGGLE_FEATURE';
export const SET_SERVER_TYPE = 'SET_SERVER_TYPE';
export const SET_PROPERTY = 'SET_PROPERTY';
export const SET_ROOT_PROPERTY = 'SET_ROOT_PROPERTY';
export const SET_GLOB = 'SET_GLOB';

const demoData = {
	'100': {
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

export function updateProperty(key, property, newValue, globIndex = false) {
	return (dispatch: Function, getState: Function) => {
		const state = getState();

		if (globIndex !== false) {
			dispatch(setGlob(key, property, newValue, globIndex));
		} else if (!property) {
		    dispatch(setRootProperty(key, newValue, state.config.projectId));
		} else {
		    dispatch(setProperty(key, property, newValue));
		}
	    
		// save it 
		// might need to get state to know where to save it to
	 //    storage.set('config'+id,  function(error, data) {
		// 	if (error) throw error;

		// 	if (data.id) {
		// 		dispatch(recievedConfig(data));
		// 	} else {
		// 		dispatch(recievedConfig(demoData[id]));
		// 	}
		// });
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