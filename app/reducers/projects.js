
// import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';

const initialState = [
	{
		id: 100,
		name: 'Example Project',
		state: 'stopped'
	},
	{
		id: 101,
		name: 'Another Project',
		state: 'running'
	}
];

export default function projects(
	state: Object = initialState, 
	action: Object
) {
	return state;
}