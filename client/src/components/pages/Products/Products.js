import './Products.scss';
import { Container } from 'react-bootstrap';
import ProductBox from '../../common/ProductBox/ProductBox';
import { useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/productsReducer';
import { Col, Row } from 'react-bootstrap';

const Products = () => {
  const products = useSelector(getAllProducts);
  if (products.length === 0)
    return <Col className="text-center">No products to show...</Col>;
  return (
    <Container style={{ marginTop: '8rem' }}>
      <Row className="d-flex justify-content-center align-items-center fs-1">
        ALL PRODUCTS
      </Row>
      <Row className="mx-0 text-center justify-content-center products">
        {products.map((product) => (
          <Col
            key={product.id}
            className="d-flex col-12 col-xxl-3 col-lg-4 col-md-6 m-0 p-3 text-center justify-content-center"
          >
            <ProductBox {...product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
