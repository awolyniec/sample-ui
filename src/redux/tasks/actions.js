import types from './types';

export const fetchTasks = params => ({
  type: types.FETCH_TASKS,
  payload: params
});

export const setTasks = data => ({
  type: types.SET_TASKS,
  payload: data
});

export const setError = error => ({
  type: types.SET_ERROR,
  payload: error
});

export const createTask = body => ({
  type: types.CREATE_TASK,
  payload: body
});

export const setCreateTaskConfirmationStatus = body => ({
  type: types.SET_CREATE_TASK_CONFIRMATION_STATUS,
  payload: body
});

export const completeTask = taskId => ({
  type: types.COMPLETE_TASK,
  payload: taskId
});

export const deleteTask = taskId => ({
  type: types.DELETE_TASK,
  payload: taskId
});