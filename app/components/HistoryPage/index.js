import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
// import styled from 'styled-components';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectMatches } from 'containers/App/selectors';
import React, { memo } from 'react';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function HistoryPage({ matches }) {
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
    renderMatchesList(sortedMatchesList);
  }
  // var sorted_meetings = meetings.sort((a,b) => {
  //     return new Date(a.scheduled_for).getTime() -
  //         new Date(b.scheduled_for).getTime()
  // }).reverse();
  // const sortedActivities = activities.sort((a, b) => b.date - a.date)

  function sortByBirthdate(order) {
    const sortedMatchesList = matches.sort((a, b) => b.birthdate - a.birthdate);
    if (order === 'increase') {
      sortedMatchesList.reverse();
    }
    renderMatchesList(sortedMatchesList);
  }

  function renderoriginList() {
    renderMatchesList(matches);
  }
  // MatchesList - למרות שכרגע הוא לא עובד אז החזרתי לרשימה הרגילה כדי שהסינון יעבוד
  // eslint-disable-next-line no-shadow
  function renderMatchesList(sortedMatchesList) {
    if (!sortedMatchesList) {
      // eslint-disable-next-line no-param-reassign
      sortedMatchesList = matches;
    }
    console.log(sortedMatchesList);
    return sortedMatchesList.map(match => (
      <div>
        {match.tz} {match.firstName} {match.lastName} {match.age} {match.gender}{' '}
        {match.brithdate} {match.status}
      </div>
    ));
  }
  return (
    <div>
      <h2>Matches History</h2>
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
      <br />
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
      <br />
      <Button
        variant="primary"
        value="originalList"
        onClick={() => {
          pickMatchesList('originalList');
        }}
      >
        Back to the original list
      </Button>{' '}
      {/* pickMatchesList זה אמןר להיות */}
      <ul>{renderMatchesList()}</ul>
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
