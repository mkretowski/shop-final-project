import {
  faTruck,
  faHeadphones,
  faReplyAll,
  faBullhorn,
} from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Container } from 'react-bootstrap';
import FeatureBox from '../../common/FeatureBox/FeatureBox';
import './FeatureBoxes.scss';

const FeatureBoxes = () => (
  <Container>
    <Row className="my-5">
      <Col className="col-12 col-md-6 col-xl-3">
        <FeatureBox
          icon={faTruck}
          title="Free shipping"
          text="all orders"
        ></FeatureBox>
      </Col>
      <Col className="col-12 col-md-6 col-xl-3">
        <FeatureBox
          icon={faHeadphones}
          title="24/7 customer"
          text="support"
        ></FeatureBox>
      </Col>
      <Col className="col-12 col-md-6 col-xl-3">
        <FeatureBox
          icon={faReplyAll}
          title="Money back"
          text="guarantee"
        ></FeatureBox>
      </Col>
      <Col className="col-12 col-md-6 col-xl-3">
        <FeatureBox
          icon={faBullhorn}
          title="Member discount"
          text="first order"
        ></FeatureBox>
      </Col>
    </Row>
  </Container>
);

export default FeatureBoxes;
