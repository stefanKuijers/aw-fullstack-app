// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import configs from '../config/config.reducer';
import workflows from '../workflow/workflow.reducer';
import projects from '../projectList/project.reducer';
import welcome from '../welcome/welcome.reducer';
import onlineProjects from '../onlineProjects/onlineProjects.reducer';

const rootReducer = combineReducers({
  configs: configs,
  workflows: workflows,
  projects: projects,
  routing: routing,
  profile: welcome,
  onlineProjects: onlineProjects
});

export default rootReducer;
