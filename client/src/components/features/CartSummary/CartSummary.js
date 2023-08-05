import React from 'react';
import { Card } from 'react-bootstrap';
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
    <Card className="px-5 text-lg-end text-center">
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
    </Card>
  );
};
export default CartSummary;
