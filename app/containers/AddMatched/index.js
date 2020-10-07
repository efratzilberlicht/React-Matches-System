import { FormattedMessage } from 'react-intl';
import React, { memo, useState, useEffect } from 'react';
import PropTypes, { func } from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Form, Col, Row, Button, Alert } from 'react-bootstrap';
import HistoryPage from 'components/HistoryPage';
import HomePage from 'containers/HomePage/Loadable';
import MatchesView from 'containers/MatchesView';
import { Switch, Route, Link } from 'react-router-dom';
import HeaderLink from 'components/Header/HeaderLink';
import { makeSelectError } from 'containers/App/selectors';
import { addMatched } from 'containers/App/actions';
import messages from 'components/Header/messages';
import makeSelectAddMatched from './selectors';
import reducer from './reducer';
import saga from './saga';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line import/order
import history from 'utils/history';

// import messages from './components/Header/messages.js';

export function AddMatched({ onAddedMatched }) {
  useInjectReducer({ key: 'addMatched', reducer });
  useInjectSaga({ key: 'addMatched', saga });
 
  const [addaMatched, setAddaMatched] = useState(false);
  const [addMatch, setaddMatched] = useState(true);
  const [alert, setalert] = useState(false);
  const click = () => {
    onAddedMatched(addaMatched);
    setaddMatched(false);
    setalert(true);
  };

  function handleAddMatched(propertyName, event) {
    const matched = { ...addaMatched };
    matched[propertyName] = event.target.value;
    setAddaMatched(matched);
  }

  return (
    <div>
      <Helmet>
        <title>Add a Match</title>
        <meta name="description" content="Description of AddMatched" />
      </Helmet>

      {addMatch ? (
        <div>
          <h2>Add Matched</h2>
          <Form>
            <Form.Group as={Row} controlId="formHorizontalTz">
              <Form.Label column sm={2} />
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Identity number"
                  value={addMatched.tz}
                  onChange={handleAddMatched.bind(this, 'tz')}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalFirstName">
              <Form.Label column sm={2} />
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={addMatched.firstName}
                  onChange={handleAddMatched.bind(this, 'firstName')}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalLastName">
              <Form.Label column sm={2} />
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={addMatched.lastName}
                  onChange={handleAddMatched.bind(this, 'lastName')}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalAge">
              <Form.Label column sm={2} />
              <Col sm={10}>
                <Form.Control
                  type="number"
                  placeholder="Age"
                  value={addMatched.age}
                  onChange={handleAddMatched.bind(this, 'age')}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalTz">
              <Form.Label column sm={2}>
                Birth date
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="date"
                  placeholder="Birthdate"
                  value={addMatched.birthdate}
                  onChange={handleAddMatched.bind(this, 'birthdate')}
                />
              </Col>
            </Form.Group>

            <fieldset>
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                  Gender
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    type="radio"
                    label="male"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    value={addMatched.gendar}
                    onSelect={handleAddMatched.bind(this, 'gendar')}
                  />
                  <Form.Check
                    type="radio"
                    label="female"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    value={addMatched.gendar}
                    onSelect={handleAddMatched.bind(this, 'gendar')}
                  />
                </Col>
              </Form.Group>
            </fieldset>
            <p>Famely state</p>
            <select
              value={addMatched.status}
              onChange={handleAddMatched.bind(this, 'status')}
            >
              <option> </option>
              <option>single</option>
              <option>devorced</option>
              <option>widower</option>
            </select>
            <br />
            <br />
            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                {/* <Button
                  type="submit"
                  onClick={click}
                  // onClick={() => {
                  //   // eslint-disable-next-line no-unused-expressions
                  //   click();
                  //   history.push('/HistoryPage');
                  // }}
                >
                  אישור
                </Button> */}
                <HeaderLink onClick={click}>OK</HeaderLink>        
                <HeaderLink to="/">Cancel</HeaderLink>
              </Col>
            </Form.Group>
          </Form>
        </div>
      ) : (
        true
      )}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/HistoryPage" component={HistoryPage} />
        <Route path="/MatchesView" component={MatchesView} />
      </Switch>
      {alert ? (
        <Alert variant="success">
          <Alert.Heading>
            Your details have been successfully received!
          </Alert.Heading>
          <HeaderLink to="/">
            <FormattedMessage {...messages.HomePage} />
          </HeaderLink>
          <HeaderLink to="/MatchesView">
            <FormattedMessage {...messages.MatchesView} />
          </HeaderLink>
        </Alert>
      ) : (
        false
      )}
    </div>
  );
}

AddMatched.propTypes = {
  matches: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onAddedMatched: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  addMatched: makeSelectAddMatched(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onAddedMatched: matched => dispatch(addMatched(matched)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddMatched);
