
import { RECIEVED_PROJECTS, DEMO_POPULATE_PROJECTS } from '../actions/projects';

const initialState = [
	{
		id: 100,
		name: 'Example Project',
		state: 'stopped',
		configId: 100
	},
	{
		id: 101,
		name: 'Another Project',
		state: 'running',
		configId: 101
	}
];

export default function projects(
	state: Object = [], 
	action: Object
) {
	switch (action.type) {
		case RECIEVED_PROJECTS:
			console.log(action.payload, state);
			return [...state, ...action.payload];
			break;

		case DEMO_POPULATE_PROJECTS:
			return initialState;
			break;
	}

	return state;
}