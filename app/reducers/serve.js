// @flow

import { START_SERVER, STOP_SERVER } from '../actions/serve';

export default function serve(
	state: Boolean = false, 
	action: Object
) {
  switch (action.type) {
    case START_SERVER:    	
    	return true;
    case STOP_SERVER:
    	return false;
    default:
        return state;
  }
}
