import produce from 'immer';
import * as data from 'data/data.json';
import {
  LOAD_MATCH,
  LOAD_MATCH_SUCCESS,
  LOAD_MATCH_ERROR,
  ADD_MATCH,
  GET_MATCH,
  UPDATE_MATCH,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  matches: data.default,
  currentMatched: false,
};
// mock functions
function getMatched(matchesList, matchedTz) {
  const currentMatched = matchesList.find(matched => matched.tz === matchedTz);
  return currentMatched;
}

function updateMatched(matchesList, matchedTz) {
  debugger;
  const newMatchesList = [...matchesList];
  newMatchesList.find(match => match.tz === matchedTz).status = 'married';
  return newMatchesList;
}

function addMatched(matchesList, newMatched) {
  const newMatchesList = [...matchesList];
  newMatchesList.push(newMatched);
  // debugger;
  return newMatchesList;
}

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_MATCH:
        draft.loading = true;
        draft.error = false;
        draft.matches = false;
        break;

      case LOAD_MATCH_SUCCESS:
        draft.matches = action.match;
        draft.loading = false;
        break;

      case LOAD_MATCH_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case GET_MATCH:
        draft.currentMatched = getMatched(state.people, action.matchedTz);
        break;

      case ADD_MATCH:
        draft.matches = addMatched(state.matches, action.matched);
        break;

      case UPDATE_MATCH:
        draft.matches = updateMatched(state.matches, action.matchedTz);
        draft.currentMatched = action.match;
        break;
    }
  });

export default appReducer;
