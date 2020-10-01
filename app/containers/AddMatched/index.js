/**
 *
 * AddMatched
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Form, Col, Row, Button } from 'react-bootstrap';
import HistoryPage from 'components/HistoryPage';
import HomePage from 'containers/HomePage/Loadable';
import { Switch, Route } from 'react-router-dom';
import makeSelectAddMatched from './selectors';
import reducer from './reducer';
import saga from './saga';

export function AddMatched() {
  useInjectReducer({ key: 'addMatched', reducer });
  useInjectSaga({ key: 'addMatched', saga });

  return (
    <div>
      <Helmet>
        <title>Add Matched</title>
        <meta name="description" content="Description of AddMatched" />
      </Helmet>
      <h2>Add Matched</h2>
      <Form>
        <Form.Group as={Row} controlId="formHorizontalFirstName">
          <Form.Label column sm={2}>
            שם פרטי
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="שם פרטי" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalLastName">
          <Form.Label column sm={2}>
            שם משפחה
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="שם משפחה" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalTz">
          <Form.Label column sm={2}>
            תעודת זהות
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="תעודת זהות" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalAge">
          <Form.Label column sm={2}>
            גיל
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="number" placeholder="גיל" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalTz">
          <Form.Label column sm={2}>
            תאריך לידה
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="date" placeholder="תאריך לידה" />
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
              />
              <Form.Check
                type="radio"
                label="נקבה"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
            </Col>
          </Form.Group>
        </fieldset>
        <p>מצב</p>
        <select>
          <option> </option>
          <option>רווק</option>
          <option>גרוש</option>
          <option>אלמן</option>
        </select>
        <br />
        <br />
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">אישור</Button>
            <Button type="submit" onClick="">
              ביטול
            </Button>
          </Col>
        </Form.Group>
      </Form>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/HistoryPage" component={HistoryPage} />
      </Switch>
    </div>
  );
}

AddMatched.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addMatched: makeSelectAddMatched(),
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

export default compose(withConnect)(AddMatched);
