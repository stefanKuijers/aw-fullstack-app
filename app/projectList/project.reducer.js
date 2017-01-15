
import { RECIEVED_PROJECTS, SET_PROJECT_NAME, ADD_PROJECT, DELETE_PROJECT } from './project.actions';
import { WORKFLOW_CREATED, START_WORKFLOW, WORKFLOW_STARTED, STOP_WORKFLOW, START_BUILD, BUILD_COMPLETE } from '../workflow/workflow.actions';
import { UPDATE_PATH, RECIEVED_CONFIGS } from '../config/config.actions';
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

		case START_BUILD:
			project = getById(newState, payload.id);
			index = newState.indexOf(project);
			updatedProject = Object.assign({}, project, {
				state: 'building'
			});

			return updateArrayItem(newState, index, updatedProject);

		case BUILD_COMPLETE:
			project = getById(newState, payload.id);
			index = newState.indexOf(project);
			updatedProject = Object.assign({}, project, {
				state: 'build complete'
			});

			return updateArrayItem(newState, index, updatedProject);

		case DELETE_PROJECT:
			project = newState.filter(project => project.id == payload.id)[0];
			index = newState.indexOf(project);

			return deleteArrayItem(newState, index);

		case UPDATE_PATH:
			project = newState.find(project => project.id == payload.projectId);
			index = newState.indexOf(project);
			updatedProject = Object.assign({}, project, {
				path: payload.path
			});

			return updateArrayItem(newState, index, updatedProject);


		case RECIEVED_CONFIGS:
			console.warn('BACKWARDS COMPATIBILITY MODE ON', 'project path checked on project and on config');

			return newState.map(project => {
				return (project.path && project.path != '') ?
					project :
					Object.assign(project, {path: payload.configs[project].path})
				;
			});

		default: return state;
	}
}