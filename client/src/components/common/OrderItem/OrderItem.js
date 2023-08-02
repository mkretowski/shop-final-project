import React from 'react';
import OrderProduct from '../OrderProduct/OrderProduct';
import { Col, Row } from 'react-bootstrap';

const OrderItem = ({ order }) => {
  const { id, products } = order;

  return (
    <Col>
      <Row className="d-flex justify-content-center align-items-center fs-5">
        Order ID: {id}
      </Row>
      {products.map((product) => (
        <OrderProduct
          key={`${product.productId}-${product.size}`}
          productId={product.productId}
          size={product.size}
          quantity={product.quantity}
        />
      ))}
    </Col>
  );
};

export default OrderItem;
