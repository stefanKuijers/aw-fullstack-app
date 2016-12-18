
import Workflow from './Workflow';

// @flow

export const START_WORKFLOW = 'START_WORKFLOW';
export const STOP_WORKFLOW = 'STOP_WORKFLOW';
export const WORKFLOW_STARTED = 'WORKFLOW_STARTED';
export const WORKFLOW_STOPPED = 'WORKFLOW_STOPPED';
export const WORKFLOW_CREATED = 'WORKFLOW_CREATED';

export const START_BUILD = 'START_BUILD';
export const BUILD_COMPLETE = 'BUILD_COMPLETE';
export const BUILD_ERROR = 'BUILD_ERROR';


export function startWorkflow(project) {
	return (dispatch: Function, getState: Function) => {
		const workflow = getWorkflow(project, dispatch, getState);
		workflow.start( (workflow) => {
			dispatch(workflowStarted(project.id, workflow))
		});
		dispatch(startBuild(project.id, workflow));

		dispatch({
			type: START_WORKFLOW,
			payload: { project, workflow }
		});
	};
}

export function stopWorkflow(project) {
	return (dispatch: Function, getState: Function) => {
		const workflow = getWorkflow(project, dispatch, getState);
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

export function workflowStarted(projectId, workflow) {
	return (dispatch: Function, getState: Function) => {
		const project = getState().projects.filter(
			item => item.id == projectId
		)[0];

		dispatch({
			type: WORKFLOW_STARTED,
			payload: {
				project,
				workflow
			}
		});
	};
}

export function workflowStopped() {
	
}

export function startBuild(projectId, workflow) {
	return (dispatch: Function, getState: Function) => {
		const project = getState().projects.filter(
			item => item.id == projectId
		)[0];
		const workflow = workflow || getWorkflow(project, dispatch, getState);
		workflow.build(() => {
			dispatch(buildComplete(project.id))
		});

		dispatch({
			type: START_BUILD,
			payload: project
		});
	}
}

export function buildComplete(projectId) {
	return (dispatch: Function, getState: Function) => {
		const project = getState().projects.filter(
			item => item.id == projectId
		)[0];

		dispatch({
			type: BUILD_COMPLETE,
			payload: project
		});
	}
}


export function workflowCreated(workflow, project) {
	return {
		type: WORKFLOW_CREATED,
		payload: {
			workflow,
			project
		}
	};
}

function getWorkflow(project, dispatch, getState) {
	const config = getState().configs[project.configId];
	let workflow;

	if (project.workflowId) {
		workflow = getState().workflows.filter(
			item => item.id == project.workflowId
		)[0];
		workflow.loadConfig(config);
	} else {
		workflow = new Workflow(
			project, 
			config
		);
		dispatch(workflowCreated(workflow, project));
	}

	return workflow;
}
