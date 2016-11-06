// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import server from './server';

const rootReducer = combineReducers({
  counter: counter,
  server: server,
  routing: routing
});

export default rootReducer;
