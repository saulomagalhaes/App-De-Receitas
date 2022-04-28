import { combineReducers } from 'redux';
import foods from './foods';
import drinks from './drinks';
import user from './user';

const rootReducer = combineReducers({
  user,
  foods,
  drinks,
});

export default rootReducer;
