import { combineReducers } from 'redux';
import user from './user';
import token from './token';
import questions from './questions';

const rootReducer = combineReducers({
  user,
  token,
  questions,
});

export default rootReducer;
