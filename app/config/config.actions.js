// @flow
import { getStoredState, SAVE_STATE } from '../app/stateStorage';
import { setProjectName } from '../projectList/project.actions';

export const RECIEVED_CONFIGS = 'RECIEVED_CONFIGS';
export const SET_CURRENT_CONFIG_ID = 'SET_CURRENT_CONFIG_ID';
export const SET_PROPERTY = 'SET_PROPERTY';
export const SET_ROOT_PROPERTY = 'SET_ROOT_PROPERTY';

// maybe features could have their own actions and reducure. Maybe even their own store
export const SET_GLOB = 'SET_GLOB';
export const ADD_GLOB = 'ADD_GLOB';
export const REMOVE_GLOB = 'REMOVE_GLOB';
export const MOVE_GLOB = 'MOVE_GLOB';


export function fetchConfig(id) {
	return (dispatch: Function, getState: Function) => {
		dispatch(setCurrentConfigId(id));

		if (getState && getState().configs[id]) {
			dispatch(recievedConfigs(getState().configs, id));
		} else {
			getStoredState('configs', function(configs) {
				console.warn('RECIEVED_CONFIGS providing demoData in case user has no data');
				dispatch(recievedConfigs(configs, id));
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

		dispatch({type: SAVE_STATE, payload: 'configs'});
	}
}

export function setGlob(key, property, newValue, globIndex) {
	return {
		type: SET_GLOB,
		payload: { key, property, newValue, globIndex }
	};
}

export function addGlob(configId, key) {
	return (dispatch: Function) => {
		dispatch({
			type: ADD_GLOB,
			payload: { configId, key }
		});

		dispatch({type: SAVE_STATE, payload: 'configs'});
	}
}

export function removeGlob(configId, key, index) {
	return (dispatch: Function) => {
		dispatch({
			type: REMOVE_GLOB,
			payload: { configId, key, index }
		});

		dispatch({type: SAVE_STATE, payload: 'configs'});
	}
}

export function moveGlob(configId, key, index, newIndex) {
	return (dispatch: Function) => {
		dispatch({
			type: MOVE_GLOB,
			payload: { configId, key, index, newIndex }
		});

		dispatch({type: SAVE_STATE, payload: 'configs'});
	}
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
