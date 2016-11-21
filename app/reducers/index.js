// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import configs from './configs';
import workflows from './workflows';
import projects from './projects';

const rootReducer = combineReducers({
  configs: configs,
  workflows: workflows,
  projects: projects,
  routing: routing
});

export default rootReducer;
