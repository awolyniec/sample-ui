import types from './types';

const INITIAL_STATE = {
  tasks: [],
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
    case types.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
