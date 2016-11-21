
import { 
	RECIEVED_CONFIG, 
	SET_PROPERTY,
	SET_ROOT_PROPERTY,
	SET_GLOB
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
		case RECIEVED_CONFIG:
			newState = {
				currentConfigId: action.payload.id
			};

			newState[action.payload.id] = action.payload;
			return Object.assign({}, newState);
			break;

		case SET_PROPERTY:
			payload = action.payload;
			newState = state;
			newState[newState.currentConfigId][payload.key][payload.property] = payload.newValue;
			return Object.assign({}, newState);
			break;

		case SET_ROOT_PROPERTY:
			payload = action.payload;
			newState = state;
			console.log(action.payload, newState[newState.currentConfigId]);
			newState[newState.currentConfigId][payload.key] = payload.newValue;
			return Object.assign({}, newState);
			break;

		case SET_GLOB:
			payload = action.payload;
			newState = state;
			newState[newState.currentConfigId][payload.key][payload.property][payload.globIndex] = payload.newValue;
			return Object.assign({}, newState);
			break;
	}

	return state;
}