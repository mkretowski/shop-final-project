import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './MyOrders.scss';
import { getAllOrders } from '../../../redux/ordersReducer';
import { useSelector } from 'react-redux';
import OrderItem from '../../common/OrderItem/OrderItem';
import { getUser } from '../../../redux/userReducer';
import { Navigate } from 'react-router-dom';
const MyOrders = () => {
  const orders = useSelector(getAllOrders);
  const user = useSelector(getUser);
  if (!user) {
    return <Navigate to="/" />;
  } else {
    return (
      <Container className="my-orders">
        <Row className="d-flex justify-content-center align-items-center fs-1">
          YOUR ORDERS
        </Row>
        {orders.length ? (
          orders.map((order) => (
            <Row key={order.id} className="d-flex align-items-center my-2">
              <OrderItem order={order} />
            </Row>
          ))
        ) : (
          <Row className="d-flex my-5 justify-content-center align-items-center fs-4">
            Make an order first!
          </Row>
        )}
      </Container>
    );
  }
};

export default MyOrders;
