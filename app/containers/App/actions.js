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

/**
 * Load the matcheses, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_MATCH
 */
export function loadMatches() {
  return {
    type: LOAD_MATCH,
  };
}

/**
 * Dispatched when the matcheses are loaded by the request saga
 *
 * @param  {array} matcheses The matchesesitory data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_MATCH_SUCCESS passing the matcheses
 */
export function matchesLoaded(matches) {
  return {
    type: LOAD_MATCH_SUCCESS,
    matches,
  };
}

/**
 * Dispatched when loading the matcheses fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_MATCH_ERROR passing the error
 */
export function matchesLoadingError(error) {
  return {
    type: LOAD_MATCH_ERROR,
    error,
  };
}
// GET MATCHED
export function getMatched(matchedId) {
  return {
    type: GET_MATCH,
    matchedId,
  };
}

export function getMatchedSuccess(matched) {
  return {
    type: GET_MATCH_SUCCESS,
    matched,
  };
}

export function getMatchedError(error) {
  return {
    type: GET_MATCH_ERROR,
    error,
  };
}
// ADD MATCHED
export function addMatched(matched) {
  return {
    type: ADD_MATCH,
    matched,
  };
}

export function addMatchedSuccess(matched, matches) {
  return {
    type: ADD_MATCH_SUCCESS,
    matched,
    matches,
  };
}

export function addMatchedError(error) {
  return {
    type: ADD_MATCH_ERROR,
    error,
  };
}
// UPDATE MATCHED
export function updateMatched(matched) {
  return {
    type: UPDATE_MATCH,
    matched,
  };
}

export function updateMatchedSuccess(matched, matches) {
  return {
    type: UPDATE_MATCH_SUCCESS,
    matched,
    matches,
  };
}

export function updateMatchedError(error) {
  return {
    type: UPDATE_MATCH_ERROR,
    error,
  };
}
