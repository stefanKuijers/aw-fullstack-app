
import Workflow from './Workflow';

// @flow

export const START_WORKFLOW = 'START_WORKFLOW';
export const STOP_WORKFLOW = 'STOP_WORKFLOW';
export const WORKFLOW_STARTED = 'WORKFLOW_STARTED';
export const WORKFLOW_STOPPED = 'WORKFLOW_STOPPED';

export const START_BUILD = 'START_BUILD';
export const BUILD_COMPLETE = 'BUILD_COMPLETE';
export const BUILD_ERROR = 'BUILD_ERROR';


export function initiateWorkflow(project, projectConfig) {
	return (dispatch: Function, getState: Function) => {
		const state = getState();
		const workflow = new Workflow(
			project,
			projectConfig,
			(workflow) => {
				dispatch(workflowStarted(project, workflow))
			}
		);

		dispatch(startWorkflow(project, workflow));
	};
}

export function startWorkflow(project, workflow) {
	return {
		type: START_WORKFLOW,
		payload: { project, workflow }
	};
}

export function stopWorkflow(project) {
	return (dispatch: Function, getState: Function) => {
		const workflow = getWorkflow(getState(), project.id);
		workflow.stop();

	    dispatch({
			type: STOP_WORKFLOW,
			payload: {
				project, 
				workflow
			}
		});
	};
}

export function workflowStarted(project, workflow) {
	return {
		type: WORKFLOW_STARTED,
		payload: {
			project,
			workflow
		}
	};
}

export function workflowStopped() {
	
}

export function startBuild(project) {
	return (dispatch: Function, getState: Function) => {
		const workflow = getWorkflow(getState(), project.id);
		workflow.build(() => {
			dispatch(buildComplete(project))
		});

		dispatch({
			type: START_BUILD,
			payload: project
		});
	}
}

export function buildComplete(project) {
	return {
		type: BUILD_COMPLETE,
		payload: project
	}
}


function getWorkflow(state, id) {
	return state.workflows.filter(
		workflow => workflow.projectId == id
	)[0];
}