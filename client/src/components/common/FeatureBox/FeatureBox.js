import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import './FeatureBox.scss';

const FeatureBox = ({ icon, title, text }) => (
  <Card className="text-center m-3">
    <Card.Body>
      <FontAwesomeIcon className="fs-1 m-3" icon={icon} />
      <Card.Title className="fs-4">{title}</Card.Title>
      <Card.Text className="fs-5">{text}</Card.Text>
    </Card.Body>
  </Card>
);

export default FeatureBox;
