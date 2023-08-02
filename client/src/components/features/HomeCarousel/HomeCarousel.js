import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';
import './HomeCarousel.scss';
import { API_URL } from '../../../config';

const HomeCarousel = () => {
  return (
    <Carousel fade className="text-center home-carousel mb-5">
      <Carousel.Item interval={3000}>
        <Image src={`${API_URL}/uploads/Carousel1.jpg`} />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <Image src={`${API_URL}/uploads/Carousel2.jpg`} />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <Image src={`${API_URL}/uploads/Carousel3.jpg`} />
        <Carousel.Caption className="text-white">
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeCarousel;
