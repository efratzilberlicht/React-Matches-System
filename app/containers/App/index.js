/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
// import { Switch, Route } from 'react-router-dom';
// import HomePage from 'containers/HomePage/Loadable';
// import AddMatch from 'containers/AddMatched';
// import MatchesView from 'containers/MatchesView';
// import HistoryPage from 'components/HistoryPage';
import Header from 'components/Header';
import 'style.scss';

export default function App() {
  return (
    <div>
      <Helmet
        titleTemplate="React Matches System"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      {/* <HomePage /> */}
    </div>
  );
}
