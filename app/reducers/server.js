// @flow

import { START_SERVER, STOP_SERVER } from '../actions/server';

const initialState = {
	running: false
};

var watch; 

export default function server(
	state: Object = initialState, 
	action: Object
) {
  switch (action.type) {
    case START_SERVER:
    	config.browserSync.task();
    	watch = config.watch.task();
	
    	return {
    		...state,
    		running: true

    	};
    case STOP_SERVER:
	    plugin.browserSync.exit();
	    watch.close();
	    
    	return {
    		...state,
    		running: false
    	};
    default:
        return state;
  }
}
