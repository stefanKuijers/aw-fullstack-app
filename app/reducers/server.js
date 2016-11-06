// @flow

import { START_SERVER, STOP_SERVER } from '../actions/server';

const initialState = {
	running: false
};

export default function server(
	state: Object = initialState, 
	action: Object
) {
  switch (action.type) {
    case START_SERVER:
	    var exec = require('child_process').exec;
		var cmd = 'gulp';

		exec(cmd, function(error, stdout, stderr) {
			console.log('ls', error, stdout, stderr);
		  // command output is in stdout
		});

    	return {
    		...state,
    		running: true

    	};
    case STOP_SERVER:

    	return {
    		...state,
    		running: false
    	};
    default:
        return state;
  }
}
