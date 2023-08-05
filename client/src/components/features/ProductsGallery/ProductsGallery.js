import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Stack, Container, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getViewportMode } from '../../../redux/viewportModeReducer';
import './ProductsGallery.scss';
import ProductBox from '../../common/ProductBox/ProductBox';

const ProductsGallery = ({ products }) => {
  const productsToDisplay = useSelector(getViewportMode);
  const [index, setIndex] = useState(0);

  const chunkedProducts = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
      arr.slice(index * size, index * size + size),
    );

  const chunkedProductsArray = chunkedProducts(products, productsToDisplay);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    setIndex(0);
  }, [productsToDisplay]);

  return (
    <Container className="my-5">
      <Row className="d-flex justify-content-center align-items-center fs-1">
        ALL PRODUCTS
      </Row>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        slide
        variant="dark"
        className="mx-0 px-0 products-gallery"
      >
        {chunkedProductsArray.map((productsChunk, index) => (
          <Carousel.Item key={index}>
            <Stack
              direction="horizontal"
              className="d-flex col justify-content-center"
            >
              {productsChunk.map((product) => (
                <Col
                  key={product.id}
                  className="d-flex col-12 col-xxl-3 col-lg-4 col-md-6 m-0 p-3 text-center"
                >
                  <ProductBox {...product} />
                </Col>
              ))}
            </Stack>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default ProductsGallery;
