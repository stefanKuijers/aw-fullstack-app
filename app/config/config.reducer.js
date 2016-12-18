
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
	DELETE_CONFIG
} from './config.actions';
import { deepCopy } from '../utils/reducer.js';


const newConfig = {
	name: '...',
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
	dependencyManagement: {
		enabled: false
	}
};

export default function configs(
	state: Object = {}, 
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

		case ADD_PROJECT:
			newState[action.payload.configId] = Object.assign({}, deepCopy(newConfig));
			return Object.assign({}, newState);

		case DELETE_CONFIG:
			delete newState[action.payload];
			return Object.assign({}, newState);

		default: return state;
	}
}