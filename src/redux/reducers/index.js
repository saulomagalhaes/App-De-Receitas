import { combineReducers } from 'redux';
import foods from './foods';
import user from './user';

const rootReducer = combineReducers({
  user,
  foods,
});

export default rootReducer;
