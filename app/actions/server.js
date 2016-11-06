// @flow
export const START_SERVER = 'START_SERVER';
export const STOP_SERVER = 'STOP_SERVER';

export function startServer() {
  return {
    type: START_SERVER
  };
}

export function stopServer() {
  return {
    type: STOP_SERVER
  };
}

export function toggleServer() {
	return (dispatch: Function, getState: Function) => {
	    const { server } = getState();

	    dispatch(
	    	server.running ?
		    	stopServer():
		    	startServer()
	    );
	};
}