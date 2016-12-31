
import { push } from 'react-router-redux';

export function backToProjects() {
	return (dispatch: Function, getState: Function) => {
		dispatch(push('projects'));
	};
}