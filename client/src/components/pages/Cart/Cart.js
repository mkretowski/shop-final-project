import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './Cart.scss';
import { clearCart, getAll } from '../../../redux/cartReducer';
import CartProduct from '../../common/CartProduct/CartProduct';
import CartSummary from '../../features/CartSummary/CartSummary';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addOrderRequest,
  fetchOrdersByUser,
} from '../../../redux/ordersReducer';
import { getUserId } from '../../../redux/userReducer';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartProducts = useSelector(getAll);
  const userId = useSelector(getUserId);
  const payload = { userId: userId, products: cartProducts };

  const handleCheckout = async () => {
    try {
      const reqStatus = await dispatch(
        addOrderRequest({ ...payload }),
      ).unwrap();
      if (reqStatus === 201) {
        dispatch(fetchOrdersByUser(userId));
        dispatch(clearCart());
        return navigate('/myorders');
      } else if (reqStatus === 400) {
        return 'clientError';
      } else {
        return 'serverError';
      }
    } catch (rejectedValueOrSerializedError) {
      return 'serverError';
    }
  };

  return (
    <Container className="cart">
      <Row className="d-flex justify-content-center align-items-center fs-1">
        YOUR CART
      </Row>
      <Row className="justify-content-end align-items-center">
        {cartProducts.length ? (
          cartProducts.map((item) => (
            <Row
              key={item.productId + item.size}
              className="d-flex align-items-center my-1 cart-products"
            >
              <CartProduct
                productId={item.productId}
                quantity={item.quantity}
                size={item.size}
              ></CartProduct>
            </Row>
          ))
        ) : (
          <Row className="d-flex my-5 justify-content-center align-items-center fs-4">
            Add products first!
          </Row>
        )}
      </Row>

      <Row className="justify-content-end align-items-center my-2">
        <Col className="d-flex justify-content-end">
          <CartSummary />
        </Col>
      </Row>
      <Row className="d-flex justify-content-end align-items-end">
        <Col className="d-flex justify-content-end align-items-end">
          <Button
            variant="dark"
            type="submit"
            onClick={() => {
              handleCheckout();
            }}
          >
            CHECKOUT
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
