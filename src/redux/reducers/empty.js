import { GET_EMPTY_SIZE } from '../actions/index';

const INITIAL_STATE = null;

const empty = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_EMPTY_SIZE: {
    return action.boolean;
  }
  default:
    return state;
  }
};

export default empty;
