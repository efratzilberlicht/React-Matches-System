import produce from 'immer';
import * as data from 'data/data.json';
import {
  LOAD_MATCH,
  LOAD_MATCH_SUCCESS,
  LOAD_MATCH_ERROR,
  ADD_MATCH,
  UPDATE_MATCH,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  matches: data.default,
};
// mock functions
function updateMatched(matchesList, updatedMatched) {
  const newMatchesList = [...matchesList];
  const currentMatchedIndex = matchesList.findIndex(
    match => match.tz === updatedMatched.tz,
  );
  newMatchesList[currentMatchedIndex] = updatedMatched;
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

      case ADD_MATCH:
        draft.matches = addMatched(state.matches, action.matched);
        break;

      case UPDATE_MATCH:
        draft.matches = updateMatched(state.matches, action.match);
        break;
    }
  });

export default appReducer;
