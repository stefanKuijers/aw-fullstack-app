
import { START_WORKFLOW, STOP_WORKFLOW } from './workflow.actions';
import { deleteArrayItem, getById } from '../utils/reducer.js';

export default function projects(
	state: Object = [], 
	action: Object
) {
	switch (action.type) {
		case START_WORKFLOW:
			return [ ...state, action.payload.workflow];
			break;

	    case STOP_WORKFLOW:
	    	return deleteArrayItem(
	    		state, 
	    		state.indexOf(action.payload.workflow)
	    	);
	}

	return state;
}