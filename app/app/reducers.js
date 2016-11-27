// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import configs from '../config/config.reducer';
import workflows from '../workflow/workflow.reducer';
import projects from '../projectList/project.reducer';

const rootReducer = combineReducers({
  configs: configs,
  workflows: workflows,
  projects: projects,
  routing: routing
});

export default rootReducer;
