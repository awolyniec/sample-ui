import { all, call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import types from './types';
import { setTasks, setError, setCreateTaskConfirmationStatus, fetchTasks } from './actions';

export function* fetchTasksAsync() {
  try {
    const { data: tasks } = yield axios.get('http://localhost:3001/search'); // TODO: create config file
    yield put(setTasks(tasks));
  } catch (error) {
    yield put(setError(error));
  }
}

export function* onFetchTasks() {
  yield takeLatest(types.FETCH_TASKS, fetchTasksAsync);
}

export function* createTaskAsync({ payload: data }) {
  try {
    yield axios.post('http://localhost:3001/create', data);
    yield put(setCreateTaskConfirmationStatus(true));
  } catch (error) {
    yield put(setError(error));
  }
}

export function* onCreateTask() {
  yield takeLatest(types.CREATE_TASK, createTaskAsync);
}

export function* completeTaskAsync({ payload: taskId }) {
  try {
    yield axios.post(`http://localhost:3001/${taskId}/complete`);
    yield put(fetchTasks());
  } catch (error) {
    yield put(setError(error));
  }
}

export function* onCompleteTask() {
  yield takeLatest(types.COMPLETE_TASK, completeTaskAsync);
}

export function* deleteTaskAsync({ payload: taskId }) {
  try {
    yield axios.post(`http://localhost:3001/${taskId}/delete`);
    yield put(fetchTasks());
  } catch (error) {
    yield put(setError(error));
  }
}

export function* onDeleteTask() {
  yield takeLatest(types.DELETE_TASK, deleteTaskAsync);
}

export function* taskSagas() {
  yield all([
    call(onFetchTasks),
    call(onCreateTask),
    call(onCompleteTask),
    call(onDeleteTask)
  ]);
}