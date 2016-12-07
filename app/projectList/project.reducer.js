
import { RECIEVED_PROJECTS, SET_PROJECT_NAME, ADD_PROJECT, DELETE_PROJECT } from './project.actions';
import { WORKFLOW_CREATED, START_WORKFLOW, WORKFLOW_STARTED, STOP_WORKFLOW } from '../workflow/workflow.actions';
import { RECIEVED_CONFIGS, SET_ROOT_PROPERTY } from '../config/config.actions';
import { deleteArrayItem, getById, updateArrayItem, deepCopy } from '../utils/reducer.js';


export default function projects(
	state: Object = [], 
	action: Object
) {
	const newState = deepCopy(state);
	const payload = action.payload;

	let project;
	let index;
	let updatedProject;

	switch (action.type) {
		case RECIEVED_PROJECTS:
			// resetting the workflowIds as workflows cannot be persisted to state and are discared at app shutdown
			for (var i = payload.length - 1; i >= 0; i--) {
				payload[i].workflowId = undefined;
			}
			return [...payload];

		// probably not needed now the state persitence works
		// case RECIEVED_CONFIGS:
		// 	for (var i = newState.length - 1; i >= 0; i--) {
		// 		newState[i].name = payload.configs[project.configId].name;
		// 	}

		// 	return newState;

		case SET_ROOT_PROPERTY:			
			if (payload.key === 'name') {
				project = state.filter(project => project.id == payload.projectId)[0];
				index = state.indexOf(project);
				updatedProject = Object.assign({}, project, {name: payload.newValue});

				return updateArrayItem(newState, index, updatedProject);
			}

			return newState;

		case START_WORKFLOW:
			project = getById(newState, payload.project.id);
			index = newState.indexOf(project);
			updatedProject = Object.assign({}, project, {
				state: 'starting',
				running: true
			});

			return updateArrayItem(newState, index, updatedProject);

		case WORKFLOW_CREATED: 
			project = getById(newState, payload.project.id);
			index = newState.indexOf(project);
			updatedProject = Object.assign({}, project, {
				workflowId: payload.workflow.id
			});

			return updateArrayItem(newState, index, updatedProject);

		case WORKFLOW_STARTED:
			project = getById(newState, payload.project.id);
			index = newState.indexOf(project);
			updatedProject = Object.assign({}, project, {
				state: 'running'
			});

			return updateArrayItem(newState, index, updatedProject);

		case STOP_WORKFLOW:
			project = getById(newState, payload.project.id);
			index = newState.indexOf(project);
			updatedProject = Object.assign({}, project, {
				state: 'stopped',
				running: false
			});

			return updateArrayItem(newState, index, updatedProject);

		case ADD_PROJECT:
			return [...newState, payload];

		case DELETE_PROJECT:
			project = newState.filter(project => project.id == payload.id)[0];
			index = newState.indexOf(project);

			return deleteArrayItem(newState, index);

		default: return state;
	}
}