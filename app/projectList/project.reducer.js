
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
			return [...payload];

		case START_WORKFLOW:
			project = getById(newState, payload.project.id);
			index = newState.indexOf(project);
			updatedProject = Object.assign({}, project, {
				state: 'starting',
				starting: true,
				running: false
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
				state: 'running',
				starting: false,
				running: true
			});

			return updateArrayItem(newState, index, updatedProject);

		case STOP_WORKFLOW:
			project = getById(newState, payload.project.id);
			index = newState.indexOf(project);
			updatedProject = Object.assign({}, project, {
				state: 'stopped',
				running: false,
				starting: false
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