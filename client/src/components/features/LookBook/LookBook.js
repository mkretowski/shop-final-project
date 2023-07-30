import { Button, Card, Col, Container } from 'react-bootstrap';
import './LookBook.scss';

const LookBook = () => (
  <Container className="mb-5">
    <Card className="m-3 border-0 text-center text-white">
      <Card.Img
        src="https://images.pexels.com/photos/886404/pexels-photo-886404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Look Book"
      />
      <Card.ImgOverlay className="row align-items-center">
        <Col>
          <Card.Title style={{ fontSize: '5rem' }}>Lookbook</Card.Title>
          <Button variant="light" href="#">
            Get inspired
          </Button>
        </Col>
      </Card.ImgOverlay>
    </Card>
  </Container>
);

export default LookBook;
