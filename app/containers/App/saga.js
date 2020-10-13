import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';
import {
  matchesLoaded,
  matchesLoadingError,
  getMatchedSuccess,
  getMatchedError,
  addMatchedSuccess,
  addMatchedError,
  updateMatchedSuccess,
  updateMatchedError,
} from './actions';
import { LOAD_MATCH, GET_MATCH, ADD_MATCH, UPDATE_MATCH } from './constants';

const baseUrl = '/api';

export function* getList() {
  const requestURL = `${baseUrl}/list`;

  try {
    const matchesList = yield call(request, requestURL);
    yield put(matchesLoaded(matchesList));
  } catch (err) {
    yield put(matchesLoadingError(err));
  }
}

export function* get(action) {
  const requestURL = `${baseUrl}/get/${action.matchedId}`;

  try {
    const matched = yield call(request, requestURL);
    yield put(getMatchedSuccess(matched));
  } catch (err) {
    yield put(getMatchedError(err));
  }
}

export function* update(action) {
  const requestURL = `${baseUrl}/update/${action.matchedId}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.matchedId),
  };
  try {
    const list = yield call(request, requestURL, options);
    debugger;
    yield put(updateMatchedSuccess(action.matchedId, list));
  } catch (err) {
    yield put(updateMatchedError(err));
  }
}

export function* add(action) {
  const requestURL = `${baseUrl}/add`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(action.matched),
  };

  try {
    const matchesList = yield call(request, requestURL, options);
    yield put(addMatchedSuccess(action.matched, matchesList));
  } catch (err) {
    yield put(addMatchedError(err));
  }
}

export default function* loadData() {
  yield takeLatest(LOAD_MATCH, getList);
  yield takeEvery(ADD_MATCH, add);
  yield takeEvery(GET_MATCH, get);
  yield takeEvery(UPDATE_MATCH, update);
}
