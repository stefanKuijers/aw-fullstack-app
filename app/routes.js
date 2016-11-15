// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import ProjectListPage from './containers/ProjectListPage';
import CounterPage from './containers/CounterPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={ProjectListPage} />
    <Route path="/counter" component={CounterPage} />
  </Route>
);
