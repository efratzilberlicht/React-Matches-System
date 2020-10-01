/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */

import { defineMessages } from 'react-intl';
export const scope = 'app.components.Header';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the CalendarPage container!',
  },
  HomePage: {
    id: `${scope}.HomePage`,
    defaultMessage: 'Home Page',
  },
  AddMatch: {
    id: `${scope}.AddMatch`,
    defaultMessage: 'Add Match',
  },
  MatchesView: {
    id: `${scope}.MatchesView`,
    defaultMessage: 'Matches View',
  },
  HistoryPage: {
    id: `${scope}.HistoryPage`,
    defaultMessage: 'History Page',
  },
});
