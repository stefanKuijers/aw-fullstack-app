// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';
import { stateStorageMiddleware } from '../stateStorage';

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(hashHistory);

const enhancer = applyMiddleware(thunk, router, logger, stateStorageMiddleware);

export default function configureStore(initialState: Object) {
  return createStore(rootReducer, initialState, enhancer);
}
