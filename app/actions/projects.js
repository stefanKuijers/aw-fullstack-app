// @flow
import storage from 'electron-json-storage';

export const RECIEVED_PROJECTS = 'RECIEVED_PROJECTS';
export const DEMO_POPULATE_PROJECTS = 'DEMO_POPULATE_PROJECTS';

export function fetchProjects() {
	return (dispatch: Function) => {
		storage.get('projects',  function(error, data) {
			if (error) throw error;

			if (data.length) {
				dispatch(recievedProjects(data));
			} else {
				dispatch(demoPopulateProjects());
			}
		});
	};
}

export function recievedProjects(projects) {
	return {
		type: RECIEVED_PROJECTS,
		payload: projects
	};
}

export function demoPopulateProjects() {
	return {
		type: DEMO_POPULATE_PROJECTS
	};
}

