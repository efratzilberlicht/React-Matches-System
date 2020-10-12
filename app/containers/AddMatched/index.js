import { FormattedMessage } from 'react-intl';
import React, { memo, useState, useEffect } from 'react';
import PropTypes, { func } from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Form,
  Col,
  Row,
  Button,
  Alert,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import HeaderLink from 'components/Header/HeaderLink';
import { makeSelectError } from 'containers/App/selectors';
import { addMatched } from 'containers/App/actions';
import messages from 'components/Header/messages';
import makeSelectAddMatched from './selectors';
import reducer from './reducer';
import saga from './saga';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

export function AddMatched({ onAddedMatched }) {
  useInjectReducer({ key: 'addMatched', reducer });
  useInjectSaga({ key: 'addMatched', saga });
  // to add a matched
  const [addaMatched, setAddaMatched] = useState(false);
  // to show all the form
  const [addMatch, setAddMatch] = useState(true);
  const [alert, setalert] = useState(false);
  const click = () => {
    onAddedMatched(addaMatched);
    // debugger;
    setAddMatch(false);
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
        <div id="form">
          <h2>Add a Matched</h2>

          <Form>
            <Form.Group as={Row} controlId="formHorizontalTz">
              <Form.Label column sm={2} />
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Identity number"
                  value={addaMatched.tz}
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
                  value={addaMatched.firstName}
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
                  value={addaMatched.lastName}
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
                  value={addaMatched.age}
                  onChange={handleAddMatched.bind(this, 'age')}
                />
              </Col>
            </Form.Group>
            {/* <h5>Birth date</h5> */}
            <Form.Group as={Row} controlId="formHorizontalBirthdate">
              <Form.Label column sm={10}>
                Birth date
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="date"
                  placeholder="Birthdate"
                  value={addaMatched.birthdate}
                  onChange={handleAddMatched.bind(this, 'birthdate')}
                />
              </Col>
            </Form.Group>

            {/* close form */}

            <fieldset id="radio">
              <Form.Group as={Row}>
                {/* <Form.Label as="legend" column sm={2}>
                    Gender
                  </Form.Label> */}
                <Col sm={10}>
                  <Form.Check
                    type="radio"
                    label="male"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    value={addaMatched.gendar}
                    onSelect={handleAddMatched.bind(this, 'gendar')}
                  />
                  <Form.Check
                    type="radio"
                    label="female"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    value={addaMatched.gendar}
                    onSelect={handleAddMatched.bind(this, 'gendar')}
                  />
                </Col>
              </Form.Group>
              {/* </div> */}
            </fieldset>
          </Form>
          <div id="select">
            <DropdownButton
              id="dropdown-basic-button"
              title="Famely state"
              value={addaMatched.status}
              onChange={handleAddMatched.bind(this, 'status')}
            >
              <Dropdown.Item eventKey="single">single</Dropdown.Item>
              <Dropdown.Item eventKey="divorced">divorced</Dropdown.Item>
              <Dropdown.Item eventKey="widower">widower</Dropdown.Item>
            </DropdownButton>
          </div>
          <div id="b">
            <HeaderLink className="bt" onClick={click}>
              OK
            </HeaderLink>
            <HeaderLink className="bt" to="/">
              Cancel
            </HeaderLink>
          </div>
        </div>
      ) : (
        true
      )}

      {alert ? (
        <Alert variant="success">
          <Alert.Heading>
            Your details have been successfully received!
          </Alert.Heading>
          <div id="links">
            <HeaderLink to="/">
              <FormattedMessage {...messages.HomePage} />
            </HeaderLink>
            <HeaderLink to="/MatchesView">
              <FormattedMessage {...messages.MatchesView} />
            </HeaderLink>
            <HeaderLink to="/HistoryPage">
              <FormattedMessage {...messages.HistoryPage} />
            </HeaderLink>
          </div>
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
