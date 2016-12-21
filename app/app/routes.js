// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import ProjectListPage from '../projectList/ProjectListPage';
import ConfigPage from '../config/ConfigPage';
import WelcomePage from '../welcome/WelcomePage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={WelcomePage} />
    <Route path="/config/:configId" component={ConfigPage} />
    <Route path="/projects" component={ProjectListPage} />
  </Route>
);
