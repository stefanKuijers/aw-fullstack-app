// @flow
import axios from 'axios';

// import OnlineProjectServer from './OnlineProjectServer';
import { onError } from '../index';

export const REFRESH_ONLINE_PROJECTS = 'REFRESH_ONLINE_PROJECTS';
export const RECIEVED_ONLINE_PROJECTS = 'RECIEVED_ONLINE_PROJECTS';
export const REGISTER_ONLINE_PROJECT = 'REGISTER_ONLINE_PROJECT';
export const REGISTERED_ONLINE_PROJECT = 'REGISTERED_ONLINE_PROJECT';
export const UNREGISTER_ONLINE_PROJECTS = 'UNREGISTER_ONLINE_PROJECTS';
export const UNREGISTERED_ONLINE_PROJECTS = 'UNREGISTERED_ONLINE_PROJECTS';


export function getOnlineProjects() {
	return (dispatch: Function, getState: Function) => {
		dispatch({ type: REFRESH_ONLINE_PROJECTS });
		
		// axios.post('/getOnlineProjects').then((response) => {
		// 	dispatch(recievedOnlineProjects(
		// 		response.data.data[0], 
		// 		getState().profile.username
		// 	));
		// }).catch(onError);
	};
}

export function recievedOnlineProjects(projects, currentUsername) {
	return {
		type: RECIEVED_ONLINE_PROJECTS,
		// payload: projects
		payload: projects.filter(project => project.username != currentUsername)
	};
}

export function registerOnlineProject(project, url) {
	return (dispatch: Function, getState: Function) => {
		dispatch({ type: REGISTER_ONLINE_PROJECT, payload: project });

		// const state = getState();
		// axios.post('/registerOnlineProject', {
		//     	id: project.id,
		//     	name: state.configs[project.configId].name,
		//     	url,
		//     	username: state.profile.username
		//     }).then((response) => {
		// 		dispatch(registeredOnlineProject(project));
		// 	})
		// 	.catch(onError);
	};
}

export function registeredOnlineProject(project) {
	return {
		type: REGISTERED_ONLINE_PROJECT,
		payload: project
	};
}

export function unregisterOnlineProjects(ids = [], callback = Function) {
	return (dispatch: Function) => {
		dispatch({ 
			type: UNREGISTER_ONLINE_PROJECTS,
			payload: ids
		});

		// axios.post('/unregisterOnlineProjects', { ids })
		// 	.then((response) => {
		// 		dispatch(unregisteredOnlineProjects(ids));
		// 		callback();
		// 	})
		// 	.catch(onError);
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
