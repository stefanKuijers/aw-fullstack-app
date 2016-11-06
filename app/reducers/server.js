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
	 //    sass.render({
		//   file: "./style.scss"
		// }, function(err, result) {
		// 	console.log('result', result);
		// });
		var config = {
			dir: {
				root: 'app'
			}
		};

		var options = {
            open: 'external',
            ghostMode: {
                clicks: true,
                location: true,
                forms: true,
                scroll: true
            }
        };

        if (config.host) {
            options.proxy = config.host;
        } else {
            options.server = config.dir.root;
        }

        browserSync.init( options );
		

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
