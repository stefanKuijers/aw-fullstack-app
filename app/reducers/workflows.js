
import { START_SERVER, STOP_SERVER } from '../actions/projects';

export default function projects(
	state: Object = [], 
	action: Object
) {
	let newState;

	switch (action.type) {
		case START_SERVER:
			const projectConfig = Object.assign({
				watch: {
					path: [
						'C:/Users/Felhasznalo/dev/aw-fullstack/public_html/**/*',
						'!C:/Users/Felhasznalo/dev/aw-fullstack/public_html/**/dist/**/*'
					]
				}
			}, action.payload.config);

			config.load(projectConfig);
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