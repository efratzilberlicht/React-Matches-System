import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Navbar, Nav } from 'react-bootstrap';
import messages from './messages';
// eslint-disable-next-line import/no-unresolved
import logo from './kidoushin_logo.png';
import './style.scss';
function Header() {
  return (
    <div>
      <center>
        <img id="logo" src={logo} alt="logo" />
        <Navbar dir="rtl" expand="lg">
          <Nav.Link href="/HistoryPage">
            <FormattedMessage {...messages.HistoryPage} />
          </Nav.Link>
          <Nav.Link href="/MatchesView">
            <FormattedMessage {...messages.MatchesView} />
          </Nav.Link>
          <Nav.Link href="/AddMatch">
            <FormattedMessage {...messages.AddMatch} />
          </Nav.Link>
          <Nav.Link href="/">
            <FormattedMessage {...messages.HomePage} />
          </Nav.Link>
        </Navbar>
      </center>
    </div>
  );
}

Header.propTypes = {};

export default memo(Header);
