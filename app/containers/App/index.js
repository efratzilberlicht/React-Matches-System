import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import AddMatch from 'containers/AddMatched';
import MatchesView from 'containers/MatchesView';
import HistoryPage from 'components/HistoryPage';
import Header from 'components/Header';
import 'style.scss';

export default function App() {
  return (
    <div id="app">
      <Helmet
        titleTemplate="React Matches System"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/AddMatch" component={AddMatch} />
        <Route path="/MatchesView" component={MatchesView} />
        <Route path="/HistoryPage" component={HistoryPage} />
      </Switch>
      {/* <HomePage /> */}
    </div>
  );
}
