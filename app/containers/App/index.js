import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectMatches,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import AddMatch from 'containers/AddMatched';
import MatchesView from 'containers/MatchesView';
import HistoryPage from 'components/HistoryPage';
import Header from 'components/Header';
import { useInjectSaga } from 'utils/injectSaga';
import { loadMatches } from './actions';
import saga from './saga';
import 'style.scss';

export function App({ matches, loading, error, onLoadMatches }) {
  useInjectSaga({ key: 'App', saga });
  useEffect(() => {
    if (!matches) onLoadMatches();
  }, []);

  return (
    <div id="app">
      <Helmet
        titleTemplate="React Matches System"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      {/* {loading && <div className="loading">loading...</div>} */}
      {error && <div className="error">error occured</div>}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/AddMatch" component={AddMatch} />
        <Route path="/MatchesView" component={MatchesView} />
        <Route path="/HistoryPage" component={HistoryPage} />
      </Switch>
    </div>
  );
}

App.propTypes = {
  matches: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onLoadMatches: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  matches: makeSelectMatches(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadMatches: () => dispatch(loadMatches()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
