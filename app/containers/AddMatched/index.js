import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
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
  Alert,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import HeaderLink from 'components/Header/HeaderLink';
import { makeSelectError } from 'containers/App/selectors';
import { addMatched } from 'containers/App/actions';
import makeSelectAddMatched from './selectors';
import reducer from './reducer';
import saga from './saga';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

export function AddMatched({ onAddedMatched }) {
  document.body.style.overflow = 'hidden';
  useInjectReducer({ key: 'addMatched', reducer });
  useInjectSaga({ key: 'addMatched', saga });

  const idRef = createRef();

  const [addaMatched, setAddaMatched] = useState(false);
  const [addMatch, setAddMatch] = useState(true);
  const [alert, setalert] = useState(false);
  const [Status, setStatus] = useState('Famely state');
  const click = () => {
    onAddedMatched(addaMatched);
    setAddMatch(false);
    setalert(true);
  };
  const cancel = () => {
    Form.clearValue();
  };

  const handleAddMatched = event => {
    const matched = { ...addaMatched };
    if (event === 'single' || event === 'divorced' || event === 'widower') {
      matched.status = event;
      setStatus(event);
    } else if (event.target.name === 'id') {
      matched[event.target.name] = idRef.current.value;
    } else {
      matched[event.target.name] =
        event.target.name === 'gender' ? event.target.id : event.target.value;
    }
    setAddaMatched(matched);
  };

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
            <Form.Group as={Row} controlId="formHorizontalId">
              <Form.Label column sm={2} />
              <Col sm={10}>
                <Form.Control
                  name="id"
                  type="text"
                  ref={idRef}
                  placeholder="Identity number"
                  onChange={handleAddMatched}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalFirstName">
              <Form.Label column sm={2} />
              <Col sm={10}>
                <Form.Control
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  onChange={handleAddMatched}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalLastName">
              <Form.Label column sm={2} />
              <Col sm={10}>
                <Form.Control
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  onChange={handleAddMatched}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalAge">
              <Form.Label column sm={2} />
              <Col sm={10}>
                <Form.Control
                  name="age"
                  type="number"
                  placeholder="Age"
                  onChange={handleAddMatched}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalBirthdate">
              <Form.Label column sm={10}>
                Birth date
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name="birthdate"
                  type="date"
                  placeholder="Birthdate"
                  onChange={handleAddMatched}
                />
              </Col>
            </Form.Group>

            <fieldset id="radio">
              <Form.Group as={Row}>
                <Col sm={10}>
                  <Form.Check
                    type="radio"
                    label="male"
                    name="gender"
                    id="male"
                    onChange={handleAddMatched}
                  />
                  <Form.Check
                    type="radio"
                    label="female"
                    name="gender"
                    id="female"
                    onChange={handleAddMatched}
                  />
                </Col>
              </Form.Group>
            </fieldset>
          </Form>
          <div id="select">
            <DropdownButton
              name="status"
              id="dropdown-basic-button"
              title={Status}
              onSelect={handleAddMatched}
            >
              <Dropdown.Item name="status" eventKey="single">
                single
              </Dropdown.Item>
              <Dropdown.Item name="status" eventKey="divorced">
                divorced
              </Dropdown.Item>
              <Dropdown.Item name="status" eventKey="widower">
                widower
              </Dropdown.Item>
            </DropdownButton>
          </div>
          <div id="b">
            <HeaderLink className="bt" onClick={click}>
              OK
            </HeaderLink>
            <HeaderLink className="bt" onClick={cancel}>
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
        </Alert>
      ) : (
        false
      )}
    </div>
  );
}

AddMatched.propTypes = {
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
