/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'react-bootstrap';

export default function MatchCard(props) {
  return (
    <Card>
      <Card.Body className="body">
        <Card.Title className="text">
          {props.match.firstName} {props.match.lastName}
        </Card.Title>
        <Card.Text className="text">
          {props.match.tz} ,{props.match.gender} ,{props.match.status},{' '} 
          {props.match.age} , {props.match.birthdate}  
          
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
