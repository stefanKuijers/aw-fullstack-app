// @flow

export const START_WORKFLOW = 'START_WORKFLOW';
export const STOP_WORKFLOW = 'STOP_WORKFLOW';
export const WORKFLOW_STARTED = 'WORKFLOW_STARTED';
export const WORKFLOW_STOPPED = 'WORKFLOW_STOPPED';

export function initiateWorkflow(project, projectConfig) {
	return (dispatch: Function, getState: Function) => {
		const state = getState();

		config.load(JSON.stringify(projectConfig));
		if (config.dependencyManagement.enabled) {config.dependencyManagement.task()}
		if (config.sass.enabled) {config.sass.task()}
		if (config.javascript.enabled) {config.javascript.task()}

		let newWorkflow = {
			id: state.projects.length,
			projectId: project.id,
			configId: projectConfig.id,
			browserSync: config.browserSync.task(
				(data, browserSyncInstance) => {
					dispatch(workflowStarted(project, browserSyncInstance, newWorkflow.id))
				}
			)
		};
		if (config.watch.enabled) {newWorkflow.watch = config.watch.task();}

		dispatch(startWorkflow(project, newWorkflow));
	};
}

export function startWorkflow(project, newWorkflow) {
	return {
		type: START_WORKFLOW,
		payload: { project, newWorkflow }
	};
}

export function stopWorkflow(project) {
	plugin.browserSync.exit();

    return {
		type: STOP_WORKFLOW,
		payload: { project }
	};
}

export function workflowStarted(project, browserSyncInstance, workflowId) {
	const portKey = browserSyncInstance.server._connectionKey;

	return {
		type: WORKFLOW_STARTED,
		payload: {
			workflowId,
			project,
			ip: browserSyncInstance.utils.devIp[0],
			port: portKey.slice(portKey.length-4)
		}
	};
}

export function workflowStopped() {
	
}