// @flow
import storage from 'electron-json-storage';
import { fetchConfig } from './configs.js';

export const RECIEVED_PROJECTS = 'RECIEVED_PROJECTS';
export const SET_PROJECT_NAME = 'SET_PROJECT_NAME';
export const START_SERVER = 'START_SERVER';
export const STOP_SERVER = 'STOP_SERVER';

const demoData = [
	{
		id: 100,
		name: '...',
		state: '',
		running: false,
		configId: 100
	},
	{
		id: 101,
		name: '...',
		state: '',
		running: false,
		configId: 101
	}
];

export function fetchProjects(root) {
	return (dispatch: Function, getState: Function) => {
		let state = getState();

		if (!getState || state.projects.length === 0) {
			storage.get('projects',  function(error, data) {
				if (error) throw error;

				data = demoData;
				if (data.length) {
					dispatch(recievedProjects(data));
				}
			});
		}
	};
}

export function recievedProjects(projects) {
	return {
		type: RECIEVED_PROJECTS,
		payload: projects
	};
}

export function setProjectName(name) {
	return {
		type: SET_PROJECT_NAME,
		payload: name
	};
}

export function toggleServer(project) {
	return (dispatch: Function, getState: Function) => {
		const state = getState();
		const config = state.configs[state.configs.currentConfigId];

		if (project.running) {
			dispatch(stopServer(project, config))
		} else {
			dispatch(startServer(project, config))
		}
	};
}

export function startServer(project, config) {
	return {
		type: START_SERVER,
		payload: { project, config }
	};
}

export function stopServer(project, config) {
	return {
		type: STOP_SERVER,
		payload: { project, config }
	};
}


