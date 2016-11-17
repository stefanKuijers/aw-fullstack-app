// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import ProjectListPage from './containers/ProjectListPage';
import ConfigPage from './containers/ConfigPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={ProjectListPage} />
    <Route path="/config/:configId" component={ConfigPage} />
  </Route>
);
