
import { START_SERVER, STOP_SERVER } from '../actions/projects';

export default function projects(
	state: Object = [], 
	action: Object
) {
	let newState;

	switch (action.type) {
		case START_SERVER:
			console.log(action.payload.config);
			config.load(action.payload.config);
			console.log(config);
			return [
				...state, 
				{
					id: state.length,
					browserSync: config.browserSync.task(),
					watch: config.watch.task()
				}
			];
			break;

	    case STOP_SERVER:
		    plugin.browserSync.exit();
	    	state[0].watch.close();
	    	return [];
	}

	return state;
}