
import { START_WORKFLOW, STOP_WORKFLOW } from '../actions/workflows';

export default function projects(
	state: Object = [], 
	action: Object
) {
	let newState;
	let newWorkflow;

	switch (action.type) {
		case START_WORKFLOW:
			return [ ...state, action.payload.newWorkflow ];
			break;

	    case STOP_WORKFLOW:
	    	// logic should move into reducer
	    	if (config.watch.enabled) {
		    	state[0].watch.close();
		    }
	    	return [];
	}

	return state;
}