
import { ADD_PROJECT } from '../projectList/project.actions';
import { 
	RECIEVED_CONFIGS, 
	SET_CURRENT_CONFIG_ID,
	SET_PROPERTY,
	SET_ROOT_PROPERTY,
	SET_GLOB,
	ADD_GLOB,
	REMOVE_GLOB,
	MOVE_GLOB,
	CREATE_CONFIG,
	DELETE_CONFIG,
	EXISTING_CONFIG_LOADED
} from './config.actions';
import { deepCopy } from '../utils/reducer.js';


const newConfig = {
	name: '',
	path: '',
	server: {
		type: '',
		target: ''
	},
	watch: {
		enabled: false,
		globs: []
	},
	sass: {
		enabled: false,
		outputDir: '',
		globs: []
	},
	javascript: {
		enabled: false,
		outputDir: '',
		globs: []
	},
	cachebust: {
		enabled: false,
		outputDir: '',
		globs: []
	},
	dependencyManagement: {
		enabled: false
	}
};

export default function configs(
	state: Object = {
		currentConfigId: null
	}, 
	action: Object
) {
	const newState = deepCopy(state);
	const payload = action.payload;

	switch (action.type) {
		case RECIEVED_CONFIGS:
			return { 
				...payload.configs,
				currentConfigId: payload.currentConfigId
			};

		case SET_CURRENT_CONFIG_ID:
			return { 
				...newState,
				currentConfigId: action.payload
			};

		case SET_PROPERTY:
			newState[newState.currentConfigId][payload.key][payload.property] = payload.newValue;
			return Object.assign({}, newState);

		case SET_ROOT_PROPERTY:
			newState[newState.currentConfigId][payload.key] = payload.newValue;
			return Object.assign({}, newState);

		case SET_GLOB:
			newState[newState.currentConfigId][payload.key][payload.property][payload.globIndex] = payload.newValue;
			return Object.assign({}, newState);

		case ADD_GLOB:
			newState[payload.configId][payload.key]['globs'].push('');
			return Object.assign({}, newState);

		case REMOVE_GLOB:
			newState[payload.configId][payload.key]['globs'].splice(payload.index, 1);
			return Object.assign({}, newState);

		case MOVE_GLOB:
			let globs = newState[payload.configId][payload.key]['globs'];
			var tmpGlob = globs[payload.index];
			globs[payload.index] = globs[payload.newIndex];
			globs[payload.newIndex] = tmpGlob;
			return Object.assign({}, newState);

		case CREATE_CONFIG:
			newState[payload.id] = Object.assign({}, deepCopy(newConfig));
			newState[payload.id].path = payload.path; 
			return Object.assign({}, newState);

		case EXISTING_CONFIG_LOADED:
			newState[payload.id] = Object.assign({}, payload.configData);
			return Object.assign({}, newState);

		case DELETE_CONFIG:
			delete newState[payload];
			return Object.assign({}, newState);

		default: return state;
	}
}