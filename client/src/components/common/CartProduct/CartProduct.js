import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../config';
import { Button, Row, Col, Card, FormControl } from 'react-bootstrap';
import './CartProduct.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { getProductById } from '../../../redux/productsReducer';
import {
  removeCartProduct,
  updateCartProduct,
} from '../../../redux/cartReducer';

const CartProduct = ({ productId, size, quantity }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => getProductById(state, productId));
  const { name, price } = product;
  const [quant, setQuant] = useState(quantity);
  const [total, setTotal] = useState(quant * price);

  const handleRemoveFromCart = () => {
    dispatch(removeCartProduct({ productId, size }));
  };

  const handleIncrement = () => {
    setQuant((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuant((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleQuantityChange = (e) => {
    setQuant(Math.max(e.target.value, 1));
  };

  useEffect(() => {
    setTotal(quant * price);
    dispatch(updateCartProduct({ productId, size, quantity: quant }));
  }, [productId, quant, price, size, dispatch]);

  return (
    <Card className="mb-3 h-100 cart-product">
      <Row className="d-flex h-100 p-3">
        <Col className="d-flex justify-content-center col-12 col-md-auto h-100 px-3">
          <Card.Img
            className="object-fit-cover"
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
              <Button variant="outline-secondary" onClick={handleDecrement}>
                -
              </Button>
              <FormControl
                className="mx-3"
                type="number"
                value={quant}
                onChange={handleQuantityChange}
              />
              <Button variant="outline-secondary" onClick={handleIncrement}>
                +
              </Button>
            </Row>
            <Row className="d-flex justify-content-md-end justify-content-center text-center text-md-end align-items-center">
              <Card.Text className="m-0 p-0 py-2 py-md-auto">
                <strong>Total:</strong> {total}
                <strong> $</strong>
              </Card.Text>
            </Row>
            <Row className="d-flex justify-content-md-end justify-content-center text-center text-md-end align-items-center">
              <Button
                className="m1"
                variant="dark"
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveFromCart();
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </Row>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
export default CartProduct;
