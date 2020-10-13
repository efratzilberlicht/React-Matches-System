
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';
import {
  LOAD_PERSON,
  GET_PERSON,
  ADD_PERSON,
  DELETE_PERSON,
  UPDATE_PERSON,
} from './constants';
import {
  peopleLoaded,
  personLoadingError,
  getPersonSuccess,
  getPersonError,
  addPersonSuccess,
  addPersonError,
  updatePersonSuccess,
  updatePersonError,
  deletePersonSuccess,
  deletePersonError,
} from './actions';
const baseUrl = '/api';

export function* getList() {
  const requestURL = `${baseUrl}/list`;

  try {
    const list = yield call(request, requestURL);
    yield put(peopleLoaded(list));
  } catch (err) {
    yield put(personLoadingError(err));
  }
}
export function* get(action) {
  const requestURL = `${baseUrl}/get/${action.personId}`;

  try {
    const person = yield call(request, requestURL);
    yield put(getPersonSuccess(person));
  } catch (err) {
    yield put(getPersonError(err));
  }
}
export function* update(action) {
  const requestURL = `${baseUrl}/update/${action.personId}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.person),
  };

  try {
    const list = yield call(request, requestURL, options);
    yield put(updatePersonSuccess(action.personId, list));
  } catch (err) {
    yield put(updatePersonError(err));
  }
}
export function* add(action) {
  const requestURL = `${baseUrl}/add`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.person),
  };

  try {
    const list = yield call(request, requestURL, options);
    yield put(addPersonSuccess(action.person, list));
  } catch (err) {
    yield put(addPersonError(err));
  }
}
export function* remove(action) {
  const requestURL = `${baseUrl}/delete/${action.personId}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const list = yield call(request, requestURL, options);
    yield put(deletePersonSuccess(list));
  } catch (err) {
    yield put(deletePersonError(err));
  }
}

export default function* loadData() {
  yield takeLatest(LOAD_PERSON, getList);
  yield takeEvery(GET_PERSON, get);
  yield takeEvery(UPDATE_PERSON, update);
  yield takeEvery(DELETE_PERSON, remove);
  yield takeEvery(ADD_PERSON, add);
}