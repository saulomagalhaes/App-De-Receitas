import { combineReducers } from 'redux';
import foods from './foods';
import drinks from './drinks';
import user from './user';
import empty from './empty';

const rootReducer = combineReducers({
  user,
  foods,
  drinks,
  empty,
});

export default rootReducer;
