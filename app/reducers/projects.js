
import { RECIEVED_PROJECTS, SET_PROJECT_NAME } from '../actions/projects';
import { START_WORKFLOW, WORKFLOW_STARTED, STOP_WORKFLOW } from '../actions/workflows';
import { RECIEVED_CONFIGS, SET_ROOT_PROPERTY } from '../actions/configs';

export default function projects(
	state: Object = [], 
	action: Object
) {
	let newState;
	let project;
	let index;
	let updatedProject;

	switch (action.type) {
		case RECIEVED_PROJECTS:
			return [...action.payload];

		case RECIEVED_CONFIGS:
			newState = [...state];
			newState.map((project) => { 
				return project.name = action.payload.configs[project.configId].name;
			});

			return newState;

		case SET_ROOT_PROPERTY:			
			newState = [...state];

			if (action.payload.key === 'name') {
				project = state.filter(project => project.id == action.payload.projectId)[0];
				index = state.indexOf(project);
				updatedProject = Object.assign({}, project, {name: action.payload.newValue});

				return newState
					.slice(0, index)
					.concat(updatedProject)
					.concat(state.slice(index + 1));
			}

			return newState;

		case START_WORKFLOW:
			project = state.filter(project => project.id == action.payload.project.id)[0];
			index = state.indexOf(project);
			updatedProject = Object.assign({}, project, {
				state: 'starting',
				running: true
			});

			return state
				.slice(0, index)
				.concat(updatedProject)
				.concat(state.slice(index + 1));

		case WORKFLOW_STARTED:
			project = state.filter(project => project.id == action.payload.project.id)[0];
			index = state.indexOf(project);
			updatedProject = Object.assign({}, project, {
				state: 'running',
				workflowId: action.payload.workflowId,
				url: action.payload.ip + ':' + action.payload.port
			});

			return state
				.slice(0, index)
				.concat(updatedProject)
				.concat(state.slice(index + 1));

		case STOP_WORKFLOW:
			project = state.filter(project => project.id == action.payload.project.id)[0];
			index = state.indexOf(project);
			updatedProject = Object.assign({}, project, {
				state: 'stopped',
				workflowId: null,
				running: false
			});

			return state
				.slice(0, index)
				.concat(updatedProject)
				.concat(state.slice(index + 1));
	}

	return state;
}