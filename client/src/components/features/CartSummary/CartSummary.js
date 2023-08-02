import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import './CartSummary.scss';
import { useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/productsReducer';
import { getAll } from '../../../redux/cartReducer';
const CartSummary = () => {
  const allProducts = useSelector(getAllProducts);
  const cartProducts = useSelector(getAll);
  const deliveryFee = cartProducts.length ? 5 : 0;

  const subTotal = cartProducts.reduce((sum, cartProduct) => {
    const product = allProducts.find((p) => p.id === cartProduct.productId);
    if (product) {
      return sum + product.price * cartProduct.quantity;
    }
    return sum;
  }, 0);

  const total = subTotal + deliveryFee;

  return (
    <Card>
      <Row>
        <Col className="d-flex justify-content-center col-12 col-md-auto h-100 px-3"></Col>
        <Col className="d-flex mt-md-auto mt-3 col-12 col-md-auto h-100 align-items-center justify-content-center text-center">
          <Row className="d-flex justify-content-start text-md-start text-center">
            <Card.Text className="m-0 p-0 py-2 py-md-auto">
              <strong>Subtotal: </strong>
              {subTotal}
              <strong> $</strong>
            </Card.Text>
            <Card.Text className="m-0 p-0 py-2 py-md-auto">
              <strong>Delivery: </strong>
              {deliveryFee}
              <strong> $</strong>
            </Card.Text>
            <Card.Text className="m-0 p-0 py-2 py-md-auto">
              <strong>Total: </strong>
              {total}
              <strong> $</strong>
            </Card.Text>
          </Row>
        </Col>
        <Col className="d-flex mt-3 mt-md-auto h-100 align-items-center amount-widget justify-content-md-end justify-content-center">
          <Row className="d-flex h-100">
            <Row className="d-flex justify-content-md-end justify-content-center text-center text-md-end align-items-center"></Row>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
export default CartSummary;
