import {
  LOAD_MATCH,
  LOAD_MATCH_SUCCESS,
  LOAD_MATCH_ERROR,
  ADD_MATCH,
  GET_MATCH,
  UPDATE_MATCH,
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
// GET MATVHED
export function getMatched(matchedTz) {
  return {
    type: GET_MATCH,
    matchedTz,
  };
}
// ADD MATCHED
export function addMatched(matched) {
  return {
    type: ADD_MATCH,
    matched,
  };
}
// UPDATE MATCHED
export function updateMatched(matchedTz) {
  return {
    type: UPDATE_MATCH,
    matchedTz,
  };
}
