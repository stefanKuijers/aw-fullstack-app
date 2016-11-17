// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import config from './config';
import server from './server';
import projects from './projects';

const rootReducer = combineReducers({
  config: config,
  server: server,
  projects: projects,
  routing: routing
});

export default rootReducer;
