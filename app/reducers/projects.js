
import { RECIEVED_PROJECTS, SET_PROJECT_NAME } from '../actions/projects';
import { RECIEVED_CONFIGS, SET_ROOT_PROPERTY } from '../actions/configs';

export default function projects(
	state: Object = [], 
	action: Object
) {
	let newState;

	switch (action.type) {
		case RECIEVED_PROJECTS:
			return [...action.payload];
			break;

		case RECIEVED_CONFIGS:
			newState = [...state];
			newState.map((project) => { 
				return project.name = action.payload.configs[project.configId].name;
			});

			return newState;
			break;

		case SET_ROOT_PROPERTY:
			if (action.payload.key === 'name') {
				const project = state.filter(project => project.id === action.payload.projectId)[0];
				const index = state.indexOf(project);
				const updatedProject = Object.assign({}, project, {name: action.payload.newValue});

				return state
					.slice(0, index)
					.concat(updatedProject)
					.concat(state.slice(index + 1));
			}
			break;
	}

	return state;
}