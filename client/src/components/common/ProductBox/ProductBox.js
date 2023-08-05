import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import './ProductBox.scss';
import ActionButton from '../ActionButton/ActionButton';
import { API_URL } from '../../../config';
import { useState } from 'react';

const ProductBox = ({ id, name, price }) => {
  const availableSizes = ['S', 'M', 'L', 'XL'];
  const [selectedSize, setSelectedSize] = useState('');

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  return (
    <Card className="h-100 product-box">
      <Card.Img
        className="object-fit-cover"
        style={{ height: '18rem' }}
        variant="top"
        src={`${API_URL}/uploads/${name
          .replace(/ /g, '')
          .replace(/-/g, '')}.jpg`}
        alt={name}
      />
      <Card.ImgOverlay className="row align-items-center h-100 pt-0">
        <Card.Body className="d-flex flex-column mt-0">
          <Card.Title className="my-0">{name}</Card.Title>
          <Card.Text className="mx-2 my-0">
            <strong>Price:</strong> {price} $
          </Card.Text>
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <strong>Size: </strong>
              {availableSizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? 'dark' : 'outline-dark'}
                  onClick={() => handleSizeSelection(size)}
                  className="m-1"
                >
                  {size}
                </Button>
              ))}
            </Col>
          </Row>

          <Card.Text>
            <ActionButton
              {...{ productId: id }}
              buttonType={'view'}
              dataTooltip="View Details"
            />
            <ActionButton
              {...{ productId: id, size: selectedSize, quantity: 1 }}
              buttonType={'addToCart'}
              dataTooltip="Add to Cart"
              type="button"
            />
          </Card.Text>
        </Card.Body>
      </Card.ImgOverlay>
    </Card>
  );
};
export default ProductBox;
