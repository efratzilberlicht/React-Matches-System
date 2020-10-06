import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
// import styled from 'styled-components';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectMatches } from 'containers/App/selectors';
import React, { memo } from 'react';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';

export function HistoryPage({ matches }) {
  function pickMatchesList(button, choose) {
    switch ('button') {
      case 'status':
        sortByStatus(choose);
        break;
      case 'date':
        sortByBirthdate(choose);
        break;
      case 'originList':
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
    const sortedMatchesList = matches.sort((a, b) => b.date - a.date);
    if (order === 'סדר עולה') {
      sortedMatchesList.reverse();
    }
    renderMatchesList(sortedMatchesList);
  }

  function renderoriginList() {
    renderMatchesList(matches);
  }
  // MatchesList - למרות שכרגע הוא לא עובד אז החזרתי לרשימה הרגילה כדי שהסינון יעבוד
  // eslint-disable-next-line no-shadow
  function renderMatchesList() {
    return matches.map(match => (
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
        title="מיין לפי סטטוס"
        value="status"
        onClick={() => {
          pickMatchesList(value, event.target.value);
        }}
      >
        <Dropdown.Item>רווק</Dropdown.Item>
        <Dropdown.Item>גרוש</Dropdown.Item>
        <Dropdown.Item>אלמן</Dropdown.Item>
      </DropdownButton>
      <br />
      <DropdownButton
        id="dropdown-basic-button"
        title="מיין לפי תאריך"
        value="date"
        onClick={() => {
          pickMatchesList(value, event.target.value);
        }}
      >
        <Dropdown.Item>בסדר עולה</Dropdown.Item>
        <Dropdown.Item>בסדר יורד</Dropdown.Item>
      </DropdownButton>
      <br />
      <Button
        variant="primary"
        value="originList"
        onClick={() => {
          pickMatchesList(value, '');
        }}
      >
        לרשימה המקורית
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
