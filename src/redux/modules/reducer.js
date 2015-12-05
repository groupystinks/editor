import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';

import auth from './auth';
import info from './info';
import word from './word';

export default combineReducers({
  router: routerStateReducer,
  auth,
  info,
  word,
});
