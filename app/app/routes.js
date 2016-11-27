// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import ProjectListPage from '../projectList/ProjectListPage';
import ConfigPage from '../config/ConfigPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={ProjectListPage} />
    <Route path="/config/:configId" component={ConfigPage} />
  </Route>
);
