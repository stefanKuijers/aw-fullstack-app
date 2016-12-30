// @flow
import { push } from 'react-router-redux';

import { getStoredState, SAVE_STATE } from '../app/stateStorage';

export const ACTIVATE = 'ACTIVATE';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';

export function activate(redirect = true) {
	return (dispatch: Function, getState: Function) => {
		dispatch({
			type: ACTIVATE
		});
		dispatch({ type: SAVE_STATE });

		if (redirect) {
			dispatch(push('projects'));
		}
	};
}

export function updateName(name) {
	return {
		type: UPDATE_USERNAME,
		payload: name
	};
}

export function checkActivation(params = {redirect: true}) {
	return (dispatch: Function, getState: Function) => {
		// check or we have stored data. 
		getStoredState('profile', (data) => {
			if (data && data.activated) {
				// if we do we put that user name in
				dispatch(updateName(data.username));
				// and after activate
				dispatch(activate(params.redirect));
			}
		});
	};
}
