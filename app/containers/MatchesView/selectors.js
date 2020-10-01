import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the matchesView state domain
 */

const selectMatchesViewDomain = state => state.matchesView || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MatchesView
 */

const makeSelectMatchesView = () =>
  createSelector(
    selectMatchesViewDomain,
    substate => substate,
  );

export default makeSelectMatchesView;
export { selectMatchesViewDomain };
