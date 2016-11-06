// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import serve from './serve';

const rootReducer = combineReducers({
  counter,
  serve,
  routing
});

export default rootReducer;
