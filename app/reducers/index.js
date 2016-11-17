// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import options from './options';
import server from './server';
import projects from './projects';

const rootReducer = combineReducers({
  options: options,
  server: server,
  projects: projects,
  routing: routing
});

export default rootReducer;
