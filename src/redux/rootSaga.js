import { all, call } from 'redux-saga/effects';

import { taskSagas } from './tasks/sagas';

export default function* rootSaga() {
  yield all([
    call(taskSagas),
  ]);
}