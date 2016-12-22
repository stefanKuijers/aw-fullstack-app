// @flow
import axios from 'axios';
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

import OnlineProjectServer from './OnlineProjectServer';

export const REFRESH_ONLINE_PROJECTS = 'REFRESH_ONLINE_PROJECTS';
export const RECIEVED_ONLINE_PROJECTS = 'RECIEVED_ONLINE_PROJECTS';
export const REGISTER_ONLINE_PROJECT = 'REGISTER_ONLINE_PROJECT';
export const REGISTERED_ONLINE_PROJECT = 'REGISTERED_ONLINE_PROJECT';
export const UNREGISTER_ONLINE_PROJECTS = 'UNREGISTER_ONLINE_PROJECTS';
export const UNREGISTERED_ONLINE_PROJECTS = 'UNREGISTERED_ONLINE_PROJECTS';


export function getOnlineProjects() {
	return (dispatch: Function, getState: Function) => {
		dispatch({ type: REFRESH_ONLINE_PROJECTS });
		
		axios.get('/users', {
		    params: {
		    	c: 'getOnlineProjects'
		    }
		}).then((response) => {
			console.log('state.profile', getState().profile);
			dispatch(recievedOnlineProjects(
				response.data, 
				getState().profile.username
			));
		});
	};
}

export function recievedOnlineProjects(projects, currentUsername) {
	console.log('currentUsername', currentUsername);
	return {
		type: RECIEVED_ONLINE_PROJECTS,
		payload: projects.filter(project => project.username != currentUsername)
	};
}

export function registerOnlineProject(project, url) {
	return (dispatch: Function, getState: Function) => {
		dispatch({ type: REGISTER_ONLINE_PROJECT });

		const state = getState();
		axios.post('/users', {
		    params: {
		    	c: 'registerOnlineProject',
		    	id: project.id,
		    	name: state.configs[project.configId].name,
		    	url,
		    	username: state.profile.username
		    }
		}).then((response) => {
			dispatch(registeredOnlineProject());
		});
	};
}

export function registeredOnlineProject() {
	return {
		type: REGISTERED_ONLINE_PROJECT
	};
}

export function unregisterOnlineProjects(ids = [], callback) {
	return (dispatch: Function) => {
		dispatch({ 
			type: UNREGISTER_ONLINE_PROJECTS,
			payload: ids
		});

		axios.post('/users', {
		    params: {
		    	c: 'unregisterOnlineProjects',
		    	ids
		    }
		}).then((response) => {
			dispatch(unregisteredOnlineProjects(ids));
			callback();
		});
	};
}

export function unregisteredOnlineProjects(ids) {
	return {
		type: UNREGISTERED_ONLINE_PROJECTS,
		payload: ids
	};
}


export function visitOnlineProject() {
	return (dispatch: Function) => {
		var options = {
            open: 'external',
            ghostMode: {
                clicks: true,
                location: true,
                forms: true,
                scroll: true
            }
        };

        if (config.server.type === 'express') {
            options.server = config.server.target;
        } else {
            options.proxy = config.server.target;
        }

        config.broswerSyncInstance = plugin.browserSync.create(serverName);
        config.broswerSyncInstance.init(options, callback);
	}
}