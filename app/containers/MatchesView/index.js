import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectMatches } from 'containers/App/selectors';
import { DropdownButton, Menu, Dropdown, HeaderLink } from 'react-bootstrap';
import reducer from 'containers/App/reducer';
import makeSelectMatchesView from './selectors';
// eslint-disable-next-line no-redeclare
// import HeaderLink from 'components/Header/HeaderLink';
import saga from './saga';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
// eslint-disable-next-line import/order
import history from 'utils/history';
// eslint-disable-next-line import/order
import { updateMatched, getMatched } from 'containers/App/actions';
// import { getMatched } from './App/actions';

export function MatchesView({ matches, onUpdateMatched }) {
  const [updatedMale, setUpdatedMale] = useState('male');
  const [updatedFemale, setUpdatedFemale] = useState('female');

  useInjectReducer({ key: 'matchesView', reducer });
  useInjectSaga({ key: 'matchesView', saga });

  function handleChange({ tz, firstName, lastName, gender }) {
    if (gender === 'male') {
      setUpdatedMale(firstName, lastName);
    } else {
      setUpdatedFemale(firstName, lastName);
      debugger;
      onUpdateMatched(tz);
    }
  }

  return (
    <div className="container">
      <Helmet>
        <title>Matches View</title>
        <meta name="description" content="Description of MatchesView" />
      </Helmet>
      <h2>Matches View</h2>
      <div id="button">
        <DropdownButton
          id="dropdown-basic-button"
          title={updatedMale}
          onSelect={eventKey => {
            handleChange(JSON.parse(eventKey));
            console.log(JSON.parse(eventKey));
          }}
        >
          {matches
            .filter(
              matched =>
                matched.gender === 'male' && matched.status !== 'married',
            )
            .map(matched => (
              <Dropdown.Item
                id="dropItem"
                eventKey={JSON.stringify(matched)}
                key={matched.tz}
              >
                {matched.firstName} {matched.lastName} {matched.status}
              </Dropdown.Item>
            ))}
        </DropdownButton>

        <DropdownButton
          id="dropdown-basic-button"
          title={updatedFemale}
          onSelect={eventKey => {
            handleChange(JSON.parse(eventKey));
          }}
        >
          {matches
            .filter(
              matched =>
                matched.gender === 'female' && matched.status !== 'married',
            )
            .map(matched => (
              <Dropdown.Item
                id="dropItem"
                eventKey={JSON.stringify(matched)}
                key={matched.tz}
              >
                {matched.firstName} {matched.lastName} {matched.status}
              </Dropdown.Item>
            ))}
        </DropdownButton>
      </div>
      <div id="button">
        {/* <HeaderLink className="btn" to="/HistoryPage">
          Match
        </HeaderLink>
        <HeaderLink className="btn" to="/">
          Cancel
        </HeaderLink> */}
        <button type="submit" className="btn" onClick={() => history.push('/')}>
          Cancel
        </button>
        <button
          type="submit"
          className="btn"
          onClick={() => history.push('/HistoryPage')}
        >
          Match
        </button>
      </div>
    </div>
  );
}

MatchesView.propTypes = {
  matches: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onUpdateMatched: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // matchesView: makeSelectMatchesView(),
  matches: makeSelectMatches(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSelectMatched: matchedTz => dispatch(getMatched(matchedTz)),
    onUpdateMatched: matchedTz => dispatch(updateMatched(matchedTz)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MatchesView);
