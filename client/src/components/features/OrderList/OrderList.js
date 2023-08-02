import React from 'react';
import { useSelector } from 'react-redux';
import OrderItem from './OrderItem';

const OrderList = () => {
  const orders = useSelector((state) => state.orders.data);

  return (
    <div>
      <h1>Order List</h1>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
