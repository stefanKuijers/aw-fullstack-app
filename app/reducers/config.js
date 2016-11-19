
import { RECIEVED_CONFIG, TOGGLE_FEATURE, SET_SERVER_TYPE } from '../actions/config';

const initialState = {
	name: '...',
	server: {
		type: '',
		target: ''
	},
	sass: {
		enabled: false
	},
	javascript: {
		enabled: false
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
	switch (action.type) {
		case RECIEVED_CONFIG:
			return Object.assign({}, action.payload);;
			break;

		case TOGGLE_FEATURE:
			newState = state;
			newState[action.payload].enabled = !newState[action.payload].enabled;
			return Object.assign({}, state, newState);
			break;

		case SET_SERVER_TYPE:
			newState = state;
			newState.server.type = action.payload;
			return Object.assign({}, state, newState);
			break;
	}

	return state;
}