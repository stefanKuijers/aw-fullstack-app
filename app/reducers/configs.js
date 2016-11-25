
import { 
	RECIEVED_CONFIGS, 
	SET_CURRENT_CONFIG_ID,
	SET_PROPERTY,
	SET_ROOT_PROPERTY,
	SET_GLOB,
	ADD_GLOB,
	REMOVE_GLOB,
	MOVE_GLOB
} from '../actions/configs';

const initialState = {
	name: '...',
	server: {
		type: '',
		target: ''
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
	let newState; 
	let payload;
	switch (action.type) {
		case RECIEVED_CONFIGS:
			return { 
				...action.payload.configs,
				currentConfigId: action.payload.currentConfigId
			};

		case SET_CURRENT_CONFIG_ID:
			return { 
				...state,
				currentConfigId: action.payload
			};

		case SET_PROPERTY:
			payload = action.payload;
			newState = JSON.parse(JSON.stringify(state));
			newState[newState.currentConfigId][payload.key][payload.property] = payload.newValue;
			return Object.assign({}, newState);

		case SET_ROOT_PROPERTY:
			payload = action.payload;
			newState = JSON.parse(JSON.stringify(state));
			newState[newState.currentConfigId][payload.key] = payload.newValue;
			return Object.assign({}, newState);

		case SET_GLOB:
			payload = action.payload;
			newState = JSON.parse(JSON.stringify(state));
			newState[newState.currentConfigId][payload.key][payload.property][payload.globIndex] = payload.newValue;
			return Object.assign({}, newState);

		case ADD_GLOB:
			payload = action.payload;
			newState = JSON.parse(JSON.stringify(state));
			console.log('ADD_GLOB', newState[payload.configId][payload.key]['globs']);
			newState[payload.configId][payload.key]['globs'].push('');
			return Object.assign({}, newState);

		case REMOVE_GLOB:
			payload = action.payload;
			newState = JSON.parse(JSON.stringify(state));
			newState[payload.configId][payload.key]['globs'].splice(payload.index, 1);
			return Object.assign({}, newState);

		case MOVE_GLOB:
			payload = action.payload;
			newState = JSON.parse(JSON.stringify(state));
			let globs = newState[payload.configId][payload.key]['globs'];
			var tmpGlob = globs[payload.index];
			globs[payload.index] = globs[payload.newIndex];
			globs[payload.newIndex] = tmpGlob;
			return Object.assign({}, newState);

		default: return state;
	}
}