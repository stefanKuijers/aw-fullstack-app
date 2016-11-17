
import { RECIEVED_CONFIG } from '../actions/config';



export default function config(
	state: Object = {}, 
	action: Object
) {
	switch (action.type) {
		case RECIEVED_CONFIG:
			// console.log(action.payload, state);
			return Object.assign({}, action.payload);;
			break;
	}

	return state;
}