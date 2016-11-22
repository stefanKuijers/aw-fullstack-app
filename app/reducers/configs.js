
import { 
	RECIEVED_CONFIGS, 
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
		case RECIEVED_CONFIGS:
			console.log('RECIEVED_CONFIGS', action.payload);
			return { 
				...action.payload.configs,
				currentConfigId: action.payload.currentConfigId
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

		default: return state;
	}
}