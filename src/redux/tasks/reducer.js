import types from './types';

const INITIAL_STATE = {
  tasks: [],
  createdTaskConfirmation: null,
  completedTaskConfirmation: null,
  deletedTaskConfirmation: null,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
    case types.SET_CREATE_TASK_CONFIRMATION_STATUS:
      return {
        ...state,
        createdTaskConfirmation: action.payload
      };
    case types.SET_COMPLETE_TASK_CONFIRMATION_STATUS:
      return {
        ...state,
        completedTaskConfirmation: action.payload
      };
    case types.SET_DELETE_TASK_CONFIRMATION_STATUS:
      return {
        ...state,
        deletedTaskConfirmation: action.payload
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
