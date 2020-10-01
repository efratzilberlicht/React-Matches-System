/**
 *
 * Header
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import AddMatch from 'containers/AddMatched';
import MatchesView from 'containers/MatchesView';
import HistoryPage from 'components/HistoryPage';
import messages from './messages';
import HeaderLink from './HeaderLink';
function Header() {
  return (
    <div>
      <center>
        {/* <Img src={Banner} alt="MeetAndMatch - Logo" /> */}
        <nav>
          <HeaderLink to="/">
            <FormattedMessage {...messages.HomePage} />
          </HeaderLink>
          <HeaderLink to="/AddMatch">
            <FormattedMessage {...messages.AddMatch} />
          </HeaderLink>
          <HeaderLink to="/MatchesView">
            <FormattedMessage {...messages.MatchesView} />
          </HeaderLink>
          <HeaderLink to="/HistoryPage">
            <FormattedMessage {...messages.HistoryPage} />
          </HeaderLink>
        </nav>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/AddMatch" component={AddMatch} />
          <Route path="/MatchesView" component={MatchesView} />
          <Route path="/HistoryPage" component={HistoryPage} />
        </Switch>
      </center>
    </div>
  );
}

Header.propTypes = {};

export default memo(Header);
