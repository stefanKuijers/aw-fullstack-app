// @flow
import storage from 'electron-json-storage';
import { fetchConfig } from './configs.js';
import { initiateWorkflow, stopWorkflow } from './workflows.js';

export const RECIEVED_PROJECTS = 'RECIEVED_PROJECTS';
export const SET_PROJECT_NAME = 'SET_PROJECT_NAME';

const demoData = [
	{
		id: 100,
		name: '...',
		url: null,
		state: null,
		running: false,
		configId: 100
	},
	{
		id: 101,
		name: '...',
		url: null,
		state: null,
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

export function setProjectName(id, name) {
	return {
		type: SET_PROJECT_NAME,
		payload: { id, name }
	};
}

export function toggleProject(project) {
	return (dispatch: Function, getState: Function) => {
		const state = getState();
		const config = state.configs[project.configId];

		if (project.running) {
			dispatch(stopWorkflow(project, config))
		} else {
			dispatch(initiateWorkflow(project, config))
		}
	};
}

// export function startProjet(project, config) {
// 	return (dispatch: Function, getState: Function) => {
// 		startWorkflow(project, config);

// 		return {
// 			type: START_PROJECT,
// 			payload: { project, config }
// 		};
// 	};
// }

// export function stopProject(project, config) {
// 	return {
// 		type: STOP_SERVER,
// 		payload: { project, config }
// 	};
// }


