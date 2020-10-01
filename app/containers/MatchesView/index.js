/**
 *
 * MatchesView
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMatchesView from './selectors';
import reducer from './reducer';
import saga from './saga';

export function MatchesView() {
  useInjectReducer({ key: 'matchesView', reducer });
  useInjectSaga({ key: 'matchesView', saga });

  return (
    <div>
      <Helmet>
        <title>Matches View</title>
        <meta name="description" content="Description of MatchesView" />
      </Helmet>
      <h2>This is Matches View Page</h2>
    </div>
  );
}

MatchesView.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  matchesView: makeSelectMatchesView(),
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
