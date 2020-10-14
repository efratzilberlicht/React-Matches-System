import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { updateMatched, getMatched } from 'containers/App/actions';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectMatches } from 'containers/App/selectors';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import history from 'utils/history';
import reducer from 'containers/App/reducer';
import HeaderLink from 'components/Header/HeaderLink';
import saga from './saga';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

export function MatchesView({ matches, onUpdateMatched }) {
  // const [Male, setMale] = useState('male');
  // const [Female, setFemale] = useState('female');
  const [updatedMale, setUpdatedMale] = useState({
    firstName: 'male',
    lastName: '',
  });
  const [updatedFemale, setUpdatedFemale] = useState({
    firstName: 'female',
    lastName: '',
  });

  useInjectReducer({ key: 'matchesView', reducer });
  useInjectSaga({ key: 'matchesView', saga });

  const cancel = () => {
    updatedMale.clearValue();
    updatedFemale.clearValue();
  };
  const match = () => {
    onUpdateMatched(updatedMale);
    onUpdateMatched(updatedFemale);
    history.push('/HistoryPage');
  };

  const handleChange = matched =>
    matched.gender === 'male'
      ? setUpdatedMale(matched)
      : setUpdatedFemale(matched);

  function getDropDown(updatedMatched, gender) {
    return (
      <DropdownButton
        id="dropdown-basic-button"
        title={`${updatedMatched.firstName} ${updatedMatched.lastName}`}
        onSelect={eventKey => {
          handleChange(JSON.parse(eventKey));
        }}
      >
        {matches &&
          matches
            .filter(
              matched =>
                matched.gender === gender && matched.status !== 'married',
            )
            .map(matched => (
              <Dropdown.Item
                id="dropItem"
                eventKey={JSON.stringify(matched)}
                key={matched.id}
              >
                {matched.firstName} {matched.lastName} {matched.status}
              </Dropdown.Item>
            ))}
      </DropdownButton>
    );
  }

  return (
    <div className="container">
      <Helmet>
        <title>Matches View</title>
        <meta name="description" content="Description of MatchesView" />
      </Helmet>

      <h2>Matches View</h2>

      <div id="button">
        {getDropDown(updatedMale, 'male')}
        {getDropDown(updatedFemale, 'female')}
      </div>

      <HeaderLink id="match" className="btn" onClick={match}>
        Match
      </HeaderLink>

      <HeaderLink id="cancel" className="bt" onClick={cancel}>
        Cancel
      </HeaderLink>
    </div>
  );
}

MatchesView.propTypes = {
  matches: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onUpdateMatched: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  matches: makeSelectMatches(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSelectMatched: matchedId => dispatch(getMatched(matchedId)),
    onUpdateMatched: matchedId => dispatch(updateMatched(matchedId)),
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
