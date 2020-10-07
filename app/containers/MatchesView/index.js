import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectMatches } from 'containers/App/selectors';
import { DropdownButton, Menu, Dropdown } from 'react-bootstrap';
import reducer from 'containers/App/reducer';
import makeSelectMatchesView from './selectors';
import saga from './saga';
import 'bootstrap/dist/css/bootstrap.min.css';

export function MatchesView({ matches }) {
  useInjectReducer({ key: 'matchesView', reducer });
  useInjectSaga({ key: 'matchesView', saga });

  function getMatchesList(gender) {
    return matches
      .filter(
        matched => matched.gender === gender && matched.status !== 'married',
      )
      .map(matched => ({
        key: matched.tz,
        text: `name:${matched.firstName} ${matched.lastName} age:${
          matched.age
        }`,
      }));
  }

  return (
    <div>
      <Helmet>
        <title>Matches View</title>
        <meta name="description" content="Description of MatchesView" />
      </Helmet>
      <h2>Matches View</h2>
      {/* <select>
        <option options={getMatchesList('male')}> </option>
      </select> */}
      <DropdownButton
        id="dropdown-basic-button"
        title="male"
        options={getMatchesList('male')}
      />
      {/* <Dropdown.Item>{getMatchesList('male')}</Dropdown.Item>
        <Dropdown.Item>Another action</Dropdown.Item>
        <Dropdown.Item>Something else</Dropdown.Item> */}
      <br />
      <DropdownButton
        id="dropdown-basic-button"
        title="female"
        options={getMatchesList('female')}
      />
      {/* <Dropdown.Item options={getMatchesList('female')} />
        <Dropdown.Item>Another action</Dropdown.Item>
        <Dropdown.Item>Something else</Dropdown.Item> */}
    </div>
  );
}

MatchesView.propTypes = {
  matches: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  // matchesView: makeSelectMatchesView(),
  matches: makeSelectMatches(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
