import React from 'react';
import { API_URL } from '../../../config';
import { Row, Col, Card } from 'react-bootstrap';
import './OrderProduct.scss';
import { useSelector } from 'react-redux';
import { getProductById } from '../../../redux/productsReducer';

const CartProduct = ({ productId, size, quantity }) => {
  const product = useSelector((state) => getProductById(state, productId));
  const { name, price } = product;

  const total = quantity * price;

  return (
    <Card className="mb-3 mx-2 h-100 cart-product">
      <Row className="d-flex h-100 p-3">
        <Col className="d-flex justify-content-center col-12 col-md-auto h-100 px-3">
          <Card.Img
            className="object-fit-cover h-100"
            src={`${API_URL}/uploads/${name.replace(' ', '')}.jpg`}
            alt={productId}
          />
        </Col>
        <Col className="d-flex mt-md-auto mt-3 col-12 col-md-auto h-100 align-items-center justify-content-center text-center">
          <Row className="d-flex justify-content-start text-md-start text-center">
            <Card.Title className="m-0">{name}</Card.Title>
            <Card.Text className="m-0 p-0">
              <strong>Size:</strong> {size}
            </Card.Text>
            <Card.Text className="m-0 p-0">
              <strong>Price:</strong> {price}
              <strong> $</strong>
            </Card.Text>
          </Row>
        </Col>
        <Col className="d-flex mt-3 mt-md-auto h-100 align-items-center amount-widget justify-content-md-end justify-content-center">
          <Row className="d-flex h-100">
            <Row className="d-flex justify-content-md-end justify-content-center text-center text-md-end align-items-center">
              <Card.Text className="m-0 p-0 py-2 py-md-auto">
                <strong>Quantity:</strong> {quantity}
              </Card.Text>
              <Card.Text className="m-0 p-0 py-2 py-md-auto">
                <strong>Total:</strong> {total}
                <strong> $</strong>
              </Card.Text>
            </Row>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
export default CartProduct;
