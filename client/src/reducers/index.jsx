// src/reducers/index.js

import { combineReducers } from 'redux';
import taskReducer from './taskreducers';

const rootReducer = combineReducers({
  task: taskReducer,
});

export default rootReducer;
