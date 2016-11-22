
import { START_SERVER, STOP_SERVER } from '../actions/projects';

export default function projects(
	state: Object = [], 
	action: Object
) {
	let newState;
	let newWorkflow;

	switch (action.type) {
		case START_SERVER:
			config.load(JSON.stringify(action.payload.config));

			newWorkflow = {
					id: state.length,
					browserSync: config.browserSync.task()
			};

			console.log(config);

			if (config.dependencyManagement.enabled) {config.dependencyManagement.task()}
			if (config.sass.enabled) {config.sass.task()}
			if (config.javascript.enabled) {config.javascript.task()}
			if (config.watch.enabled) {newWorkflow.watch = config.watch.task();}

			return [ ...state, newWorkflow ];
			break;

	    case STOP_SERVER:
		    plugin.browserSync.exit();

		    if (config.watch.enabled) {
		    	state[0].watch.close();
		    }
	    	return [];
	}

	return state;
}