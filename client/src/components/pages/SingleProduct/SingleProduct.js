import './SingleProduct.scss';
import {
  Row,
  Container,
  Col,
  Image,
  Button,
  FormControl,
} from 'react-bootstrap';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { addCartProduct } from '../../../redux/cartReducer';
import { useToast } from '../../../contexts/ToastContext';

const SingleProduct = () => {
  const { id } = useParams();
  const productId = id;
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState({});
  const [selectedSize, setSelectedSize] = useState(false);
  const availableSizes = ['S', 'M', 'L', 'XL'];
  const formattedName = productData.name
    ? productData.name.replace(/ /g, '').replace(/-/g, '')
    : '';

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${API_URL}/products/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((res) => setProductData(res))
        .catch((e) => console.error(e));
    };
    fetchData();
  }, [id]);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (selectedSize) {
      dispatch(addCartProduct({ productId, size: selectedSize, quantity }));
      showToast({ type: 'Success', action: 'Product added to cart!' });
    } else {
      showToast({ type: 'Error', action: 'Choose size!' });
    }
  };

  return (
    <Container style={{ marginTop: '8rem' }}>
      <Row>
        <Col className="mx-0 text-center justify-content-center products">
          <Image
            className="object-fit-cover"
            style={{ height: '18rem' }}
            variant="top"
            src={`${API_URL}/uploads/${formattedName}.jpg`}
            alt={productData.name}
          />
        </Col>
        <Col>
          <Row className="d-flex justify-content-center align-items-center fs-1">
            {productData.name}
          </Row>
          <Row className="d-flex justify-content-start align-items-center fs-5">
            <p>
              <strong>Price:</strong> {productData.price} $
            </p>
            <p>
              <strong>Description:</strong> {productData.description}
            </p>
          </Row>
          <Row className="d-flex justify-content-start align-items-center">
            <Col>
              <strong>Size: </strong>
              {availableSizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? 'dark' : 'outline-dark'}
                  onClick={() => handleSizeSelection(size)}
                  className="m-1 btn-size"
                >
                  {size}
                </Button>
              ))}
            </Col>
          </Row>
          <Row className="text-center amount-widget d-flex justify-content-center my-3">
            <Button variant="outline-secondary" onClick={handleDecrement}>
              -
            </Button>
            <FormControl
              className="mx-3"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(e.target.value, 1))}
            />
            <Button variant="outline-secondary" onClick={handleIncrement}>
              +
            </Button>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button variant="dark" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleProduct;
