
import { ACTIVATE, UPDATE_USERNAME } from './welcome.actions';

export default function projects(
	state: Object = {
		activated: false,
		username: ""
	}, 
	action: Object
) {
	switch (action.type) {
		case ACTIVATE:
			return Object.assign({}, state, {activated: true});

		case UPDATE_USERNAME:
			return Object.assign({}, state, {username: action.payload});

		default: return state;
	}
}