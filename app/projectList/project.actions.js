// @flow
import { getStoredState } from '../app/stateStorage';
import { fetchConfig } from '../config/config.actions';
import { initiateWorkflow, stopWorkflow } from '../workflow/workflow.actions';

export const RECIEVED_PROJECTS = 'RECIEVED_PROJECTS';
export const SET_PROJECT_NAME = 'SET_PROJECT_NAME';

export function fetchProjects(root) {
	return (dispatch: Function, getState: Function) => {
		let state = getState();

		if (!getState || state.projects.length === 0) {
			getStoredState('projects',  function(projects) {
				dispatch(recievedProjects(projects));
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


