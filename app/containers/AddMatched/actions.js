import { ADD_MATCH_ACTION } from './constants';

export function addMatchAction(match) {
  return {
    type: ADD_MATCH_ACTION,
    match,
  };
}
