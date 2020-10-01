/**
 *
 * Asynchronously loads the component for MatchesView
 *
 */

import loadable from '../AddMatched/MatchesView/node_modules/utils/loadable';

export default loadable(() => import('./index'));
