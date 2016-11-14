// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import server from './server';
import projects from './projects';

const rootReducer = combineReducers({
  counter: counter,
  server: server,
  projects: projects,
  routing: routing
});

export default rootReducer;
