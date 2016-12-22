// @flow
import { push } from 'react-router-redux';

import { getStoredState, SAVE_STATE, WRITE_WORKFLOWCONFIG } from '../app/stateStorage';
import { fetchConfig, deleteConfig, createConfig, loadExistingConfig, loadTemplateConfig } from '../config/config.actions';
import { startWorkflow, stopWorkflow } from '../workflow/workflow.actions';

export const RECIEVED_PROJECTS = 'RECIEVED_PROJECTS';
export const SET_PROJECT_NAME = 'SET_PROJECT_NAME';
export const ADD_PROJECT = 'ADD_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';

export function fetchProjects(root) {
	return (dispatch: Function, getState: Function) => {
		let state = getState();

		if (!getState || state.projects.length === 0) {
			getStoredState('projects', function (projects) {
				dispatch(recievedProjects(projects));
			});
		}
	};
}

export function recievedProjects(projects) {
	// resetting state in case the app was forced closed meanwhile running a workflow
	for (var i = projects.length - 1; i >= 0; i--) {
		projects[i].state = 'ready to be started';
		projects[i].workflowId = undefined;
		projects[i].starting = false;
		projects[i].running = false;
	}

	return {
		type: RECIEVED_PROJECTS,
		payload: projects
	};
}


export function createProject(path) {
	return (dispatch: Function) => {
		const id = Date.now();
		dispatch(addProject(id));
		dispatch(createConfig(id, path));
		dispatch(push(`/config/${id}`));
		dispatch({type: SAVE_STATE});
	}
}

export function addExistingProject(path) {
	return (dispatch: Function) => {
		const id = Date.now();
		dispatch(addProject(id));
		dispatch(loadExistingConfig(id, path));
		dispatch({type: SAVE_STATE});
	}
}

export function createProjectFromTemplate(path, data) {
	return (dispatch: Function, getState: Function) => {
		const id = Date.now();
		dispatch(addProject(id));
		dispatch(loadTemplateConfig(id, path, data));
		dispatch(push(`/config/${id}`));
		dispatch({type: SAVE_STATE});
		dispatch({
			type: WRITE_WORKFLOWCONFIG,
			payload: getState().configs[id]
		});
	}
}

export function deleteProject(project) {
	return (dispatch: Function) => {
		dispatch({
			type: DELETE_PROJECT,
			payload: project
		});
		dispatch(deleteConfig(project.configId));

		dispatch({type: SAVE_STATE});
	}
}

export function setProjectName(id, name) {
	return {
		type: SET_PROJECT_NAME,
		payload: { id, name }
	};
}

export function toggleProject(project) {
	return (dispatch: Function, getState: Function) => {
		if (project.running) {
			dispatch(stopWorkflow(project))
		} else {
			dispatch(startWorkflow(project))
		}
	};
}

export function addProject(id) {
	return {
		type: ADD_PROJECT,
		payload: {
			id,
			url: null,
			state: 'ready to be started',
			running: false,
			starting: false,
			configId: id,
			workflowId: null
		}
	}
}
