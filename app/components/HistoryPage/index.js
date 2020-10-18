import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectMatches } from 'containers/App/selectors';
import { DropdownButton, Dropdown, CardColumns } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import MatchCard from './MatchCard';

const STATUS = ['married', 'single', 'divorced', 'widower'];
const ORDER = ['increase order', 'decrease order'];

export function HistoryPage({ matches }) {
  const [sortedMatches, setSortedMatches] = useState([]);

  useEffect(() => {
    if (!sortedMatches.length && matches) {
      setSortedMatches(renderMatchesList());
    }
  });

  function pickMatchesList(button, choose) {
    switch (button) {
      case 'status':
        sortByStatus(choose);
        break;
      case 'date':
        sortByBirthdate(choose);
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
    if (order === 'increase order') {
      sortedMatchesList.reverse();
    }
    setSortedMatches(renderMatchesList(sortedMatchesList));
  }

  function renderoriginList() {
    setSortedMatches(renderMatchesList(matches));
  }

  function renderMatchesList(sortedMatchesList = matches) {
    return (
      sortedMatchesList &&
      sortedMatchesList.map(match => <MatchCard key={match.id} match={match} />)
    );
  }

  function getDropDown(title, type, ITEMS) {
    return (
      <DropdownButton
        id="dropdown-basic-button"
        title={title}
        onSelect={e => {
          pickMatchesList(type, e);
        }}
      >
        {ITEMS.map(item => (
          <Dropdown.Item eventKey={item} key={item}>
            {item}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
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

        {getDropDown('Sort by birthdate', 'date', ORDER)}
        {getDropDown('Sort by status', 'status', STATUS)}
      </div>

      {sortedMatches && (
        <div id="list">
          <CardColumns>{sortedMatches}</CardColumns>
        </div>
      )}
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
