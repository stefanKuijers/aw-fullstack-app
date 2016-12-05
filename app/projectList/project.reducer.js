
import { RECIEVED_PROJECTS, SET_PROJECT_NAME, ADD_PROJECT, DELETE_PROJECT } from './project.actions';
import { START_WORKFLOW, WORKFLOW_STARTED, STOP_WORKFLOW } from '../workflow/workflow.actions';
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
			return [...payload];

		case RECIEVED_CONFIGS:
			newState.map((project) => { 
				return project.name = payload.configs[project.configId].name;
			});

			return newState;

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

		case WORKFLOW_STARTED:
			project = getById(newState, payload.project.id);
			index = newState.indexOf(project);
			updatedProject = Object.assign({}, project, {
				state: 'running',
				workflowId: payload.workflowId
			});

			return updateArrayItem(newState, index, updatedProject);

		case STOP_WORKFLOW:
			project = getById(newState, payload.project.id);
			index = newState.indexOf(project);
			updatedProject = Object.assign({}, project, {
				state: 'stopped',
				workflowId: null,
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