// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import configs from './configs';
import server from './server';
import projects from './projects';

const rootReducer = combineReducers({
  configs: configs,
  server: server,
  projects: projects,
  routing: routing
});

export default rootReducer;
