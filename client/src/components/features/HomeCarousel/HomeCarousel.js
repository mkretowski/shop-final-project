import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';
import './HomeCarousel.scss';
const HomeCarousel = () => {
  return (
    <Carousel fade className="text-center">
      <Carousel.Item interval={3000}>
        <Image src="https://images.pexels.com/photos/7292969/pexels-photo-7292969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <Image src="https://images.pexels.com/photos/17542560/pexels-photo-17542560/free-photo-of-jasny-miasto-droga-krajobraz.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <Image src="https://images.pexels.com/photos/13096925/pexels-photo-13096925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
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
