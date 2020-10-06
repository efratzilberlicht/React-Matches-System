/**
 *
 * AddMatched
 *
 */
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
import { Switch, Route, Link } from 'react-router-dom';
import HeaderLink from 'components/Header/HeaderLink';
import { makeSelectError } from 'containers/App/selectors';
import { addMatched } from 'containers/App/actions';
import makeSelectAddMatched from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './components/Header/messages.js';

export function AddMatched({ matches, onAddedMatched }) {
  useInjectReducer({ key: 'addMatched', reducer });
  useInjectSaga({ key: 'addMatched', saga });
  const [addaMatched, setAddaMatched] = useState(false);
  // useEffect(() => {
  //   // When initial state username is not null, submit the form to load repos
  //   if (firstName && lastName.trim().length > 0) click();
  // }, []);
  const [alert, setalert] = useState(false);
  const click = () => setalert(!alert);

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
      <h2>Add Matched</h2>
      <Form>
        <Form.Group as={Row} controlId="formHorizontalTz">
          <Form.Label column sm={2}>
            תעודת זהות
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="תעודת זהות"
              value={addMatched.tz}
              onChange={handleAddMatched.bind(this, 'tz')}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalFirstName">
          <Form.Label column sm={2}>
            שם פרטי
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="שם פרטי"
              value={addMatched.firstName}
              onChange={handleAddMatched.bind(this, 'firstName')}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalLastName">
          <Form.Label column sm={2}>
            שם משפחה
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="שם משפחה"
              value={addMatched.lastName}
              onChange={handleAddMatched.bind(this, 'lastName')}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalAge">
          <Form.Label column sm={2}>
            גיל
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder="גיל"
              value={addMatched.age}
              onChange={handleAddMatched.bind(this, 'age')}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalTz">
          <Form.Label column sm={2}>
            תאריך לידה
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              placeholder="תאריך לידה"
              value={addMatched.birthdate}
              onChange={handleAddMatched.bind(this, 'birthdate')}
            />
          </Col>
        </Form.Group>

        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              מין
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="זכר"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                value={addMatched.gendar}
                onSelect={handleAddMatched.bind(this, 'gendar')}
              />
              <Form.Check
                type="radio"
                label="נקבה"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
                value={addMatched.gendar}
                onSelect={handleAddMatched.bind(this, 'gendar')}
              />
            </Col>
          </Form.Group>
        </fieldset>
        <p>מצב</p>
        <select
          value={addMatched.status}
          onChange={handleAddMatched.bind(this, 'status')}
        >
          <option> </option>
          <option>רווק</option>
          <option>גרוש</option>
          <option>אלמן</option>
        </select>
        <br />
        <br />
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button
              type="submit"
              onClick={() => {
                onAddedMatched(addaMatched);
              }}
            >
              אישור
            </Button>
            <HeaderLink
              to="/HistoryPage"
              onClick={() => {
                onAddedMatched(addaMatched);
              }}
            >
              אישור
            </HeaderLink>
            <HeaderLink to="/">ביטול</HeaderLink>
            {/* <Link to="/">ביטול</Link> */}
            {/* <a href="/">
              <Button type="submit">ביטול</Button>
            </a> */}
          </Col>
        </Form.Group>
      </Form>

      {/* <Form>
        <form>
          <input
            type="text"
            placeholder="שם פרטי"
            value={addMatched.tz}
            onChange={handleAddMatched.bind(this, 'tz')}
          />
          שם פרטי
          <input
            type="text"
            placeholder="שם פרטי"
            value={addMatched.firstName}
            onChange={handleAddMatched.bind(this, 'firstName')}
          />
          שם פרטי
        </form>
        <p>מצב</p>
        <select
          value={addMatched.status}
          onChange={handleAddMatched.bind(this, 'status')}
        >
          <option> </option>
          <option>רווק</option>
          <option>גרוש</option>
          <option>אלמן</option>
        </select>
        <br />
        <br />
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button
              type="submit"
              onClick={() => {
                onAddedMatched(addMatched);
              }}
            >
              אישור
            </Button>
            <HeaderLink to="/">ביטול</HeaderLink>
          </Col>
        </Form.Group>
      </Form> */}

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/HistoryPage" component={HistoryPage} />
      </Switch>
      <Alert variant="success" />
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
