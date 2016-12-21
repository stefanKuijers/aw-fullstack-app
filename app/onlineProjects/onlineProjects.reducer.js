
import { RECIEVED_ONLINE_PROJECTS, UPDATE_USERNAME } from './onlineProjects.actions';

export default function projects(
	state: Object = [], 
	action: Object
) {
	switch (action.type) {
		case RECIEVED_ONLINE_PROJECTS:
			return action.payload;

		default: return state;
	}
}