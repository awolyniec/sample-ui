import { all, call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import types from './types';
import { setTasks, setError } from './actions';

export function* fetchTasksAsync() {
  try {
    const { data: tasks } = yield axios.get('http://localhost:3001/search');
    yield put(setTasks(tasks));
  } catch (error) {
    yield put(setError(error));
  }
}

export function* onFetchTasks() {
  yield takeLatest(types.FETCH_TASKS, fetchTasksAsync);
}

export function* taskSagas() {
  yield all([
    call(onFetchTasks)
  ]);
}