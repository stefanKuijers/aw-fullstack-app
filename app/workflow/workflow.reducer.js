
import { WORKFLOW_CREATED, WORKFLOW_STARTED } from './workflow.actions';
import { deleteArrayItem, getById } from '../utils/reducer.js';

export default function projects(
	state: Object = [], 
	action: Object
) {
	switch (action.type) {
		case WORKFLOW_CREATED:
			return [ ...state, action.payload.workflow];
			break;

		case WORKFLOW_STARTED:
			return state;
			break;	

		default: return state;
	}
}