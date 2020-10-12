import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
// import styled from 'styled-components';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectMatches } from 'containers/App/selectors';
import { DropdownButton, Dropdown, CardColumns } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
// eslint-disable-next-line import/no-named-as-default-member
import { set } from 'lodash';
import MatchCard from './MatchCard';

export function HistoryPage({ matches }) {
  const [sortedMatches, setSortedMatches] = useState(renderMatchesList());

  function pickMatchesList(button, choose) {
    switch (button) {
      case 'status':
        sortByStatus(choose);
        break;
      case 'date':
        sortByBirthdate(choose);
        break;
      case 'originalList':
        renderoriginList();
        break;
      default:
        renderoriginList();
    }
  }

  function sortByStatus(status) {
    const sortedMatchesList = matches.filter(
      matched => matched.status === status,
    );

    setSortedMatches(renderMatchesList(sortedMatchesList));
  }

  function sortByBirthdate(order) {
    const sortedMatchesList = matches.sort(
      (a, b) => new Date(b.birthdate) - new Date(a.birthdate),
    );
    if (order === 'increase') {
      sortedMatchesList.reverse();
    }
    setSortedMatches(renderMatchesList(sortedMatchesList));
  }

  function renderoriginList() {
    setSortedMatches(renderMatchesList(matches));
  }

  function renderMatchesList(sortedMatchesList = matches) {
    return sortedMatchesList.map(match => (
      <MatchCard key={match.tz} match={match} />
    ));
  }
  return (
    <div className="container">
      <h2>Matches History</h2>
      <div id="buttons">
        <button
          type="submit"
          className="btn"
          value="originalList"
          onClick={() => {
            pickMatchesList('originalList');
          }}
        >
          Back to the original list
        </button>
        <DropdownButton
          id="dropdown-basic-button"
          title="Sort by birthdate"
          // value="date"
          onSelect={e => {
            pickMatchesList('date', e);
          }}
        >
          <Dropdown.Item eventKey="increase">increase order</Dropdown.Item>
          <Dropdown.Item eventKey="decrease">decrease order</Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title="Sort by status"
          onSelect={e => {
            pickMatchesList('status', e);
          }}
        >
          <Dropdown.Item eventKey="single">single</Dropdown.Item>
          <Dropdown.Item eventKey="divorced">divorced</Dropdown.Item>
          <Dropdown.Item eventKey="widower">widower</Dropdown.Item>
        </DropdownButton>
      </div>
      <div id="list">
        <CardColumns>{sortedMatches}</CardColumns>
      </div>
    </div>
  );
}

HistoryPage.propTypes = {
  matches: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  matches: makeSelectMatches(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(HistoryPage);
