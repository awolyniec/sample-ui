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