
import { 
	RECIEVED_CONFIG, 
	TOGGLE_FEATURE, 
	SET_SERVER_TYPE,
	SET_PROPERTY,
	SET_ROOT_PROPERTY,
	SET_GLOB
} from '../actions/config';

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

export default function config(
	state: Object = initialState, 
	action: Object
) {
	let newState; 
	let payload;
	switch (action.type) {
		case RECIEVED_CONFIG:
			return Object.assign({}, action.payload);;
			break;

		case TOGGLE_FEATURE:
			console.warn('deprecated action', action.type);
			newState = state;
			newState[action.payload].enabled = !newState[action.payload].enabled;
			return Object.assign({}, state, newState);
			break;

		case SET_SERVER_TYPE:
			console.warn('deprecated action', action.type);
			newState = state;
			newState.server.type = action.payload;
			return Object.assign({}, state, newState);
			break;

		case SET_PROPERTY:
			payload = action.payload;
			newState = state;
			newState[payload.key][payload.property] = payload.newValue;
			return Object.assign({}, state, newState);
			break;

		case SET_ROOT_PROPERTY:
			payload = action.payload;
			newState = state;
			newState[payload.key] = payload.newValue;
			return Object.assign({}, state, newState);
			break;

		case SET_GLOB:
			payload = action.payload;
			newState = state;
			newState[payload.key][payload.property][payload.globIndex] = payload.newValue;
			return Object.assign({}, state, newState);
			break;
	}

	return state;
}