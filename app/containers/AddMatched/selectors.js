import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addMatched state domain
 */

const selectAddMatchedDomain = state => state.addMatched || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddMatched
 */

const makeSelectAddMatched = () =>
  createSelector(
    selectAddMatchedDomain,
    substate => substate,
  );

export default makeSelectAddMatched;
export { selectAddMatchedDomain };
