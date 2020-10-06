import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { DropdownButton, Dropdown, Menu } from 'react-bootstrap';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectMatches } from 'containers/App/selectors';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import reducer from 'containers/App/reducer';
import makeSelectMatchesView from './selectors';
import saga from './saga';

export function MatchesView({ matches }) {
  useInjectReducer({ key: 'matchesView', reducer });
  useInjectSaga({ key: 'matchesView', saga });

  function getMatchesList(gender) {
    return matches
      .filter(
        matched => matched.gender === gender && matched.status !== 'married',
      )
      .map(matched => {
        return {
          key: matched.tz,
          text: `name:${matched.firstName} ${matched.lastName} age:${
            matched.age
          }`,
          value: matched.tz,
        };
      });
  }

  return (
    <div>
      <Helmet>
        <title>Matches View</title>
        <meta name="description" content="Description of MatchesView" />
      </Helmet>
      <h2>Matches View</h2>
      {/* <Menu compact>
          <Dropdown placeholder="זכר" options={getMatchesList('male')} />
      </Menu>  */}
      <DropdownButton id="dropdown-basic-button" title="זכר">
        <Dropdown.Item>{getMatchesList('male')}</Dropdown.Item>
        <Dropdown.Item>Another action</Dropdown.Item>
        <Dropdown.Item>Something else</Dropdown.Item>
      </DropdownButton>

      <DropdownButton id="dropdown-basic-button" title="נקבה">
        <Dropdown.Item options={getMatchesList('female')} />
        <Dropdown.Item>Another action</Dropdown.Item>
        <Dropdown.Item>Something else</Dropdown.Item>
      </DropdownButton>
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
