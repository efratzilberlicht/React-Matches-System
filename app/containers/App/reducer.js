import produce from 'immer';
import {
  LOAD_MATCH,
  LOAD_MATCH_SUCCESS,
  LOAD_MATCH_ERROR,
  ADD_MATCH,
  ADD_MATCH_SUCCESS,
  ADD_MATCH_ERROR,
  GET_MATCH,
  GET_MATCH_SUCCESS,
  GET_MATCH_ERROR,
  UPDATE_MATCH,
  UPDATE_MATCH_SUCCESS,
  UPDATE_MATCH_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  matches: false,
  currentMatched: false,
};

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
        draft.matches = action.matches;
        draft.loading = false;
        draft.error = false;
        break;

      case GET_MATCH:
        draft.loading = true;
        draft.error = false;
        draft.currentMatched = false;
        break;

      case GET_MATCH_SUCCESS:
        draft.loading = false;
        draft.currentMatched = action.matched;
        break;

      case UPDATE_MATCH:
      case ADD_MATCH:
        draft.loading = true;
        draft.error = false;
        break;

      case ADD_MATCH_SUCCESS:
      case UPDATE_MATCH_SUCCESS:
        draft.loading = false;
        draft.matches = action.matches;
        draft.currentMatched = action.matched;
        break;

      case ADD_MATCH_ERROR:
      case UPDATE_MATCH_ERROR:
      case GET_MATCH_ERROR:
      case LOAD_MATCH_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
