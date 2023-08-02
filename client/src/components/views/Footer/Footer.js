import React from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFacebookF,
  faYoutube,
  faPinterestP,
} from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.scss';

const Footer = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <Col className="flex-grow-0 bg-dark text-center text-white mt-5">
      <Row className="fs-3 text-white">
        <Col className="d-inline-block my-3">
          <Link className={'mx-2 ' + styles.socialLinks} to="/">
            <FontAwesomeIcon icon={faFacebookF} />
          </Link>
          <Link className={'mx-2 ' + styles.socialLinks} to="/">
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
          <Link className={'mx-2 ' + styles.socialLinks} to="/">
            <FontAwesomeIcon icon={faYoutube} />
          </Link>
          <Link className={'mx-2 ' + styles.socialLinks} to="/">
            <FontAwesomeIcon icon={faPinterestP} />
          </Link>
        </Col>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-center">
            <Col className="p-2 my-auto mx-2" md="auto">
              <p className="m-0 p-0">
                <strong>Sign up for our newsletter</strong>
              </p>
            </Col>
            <Col className="col-10 col-md-5 col-lg-4 p-2">
              <Form.Group className="my-auto" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
            </Col>
            <Col className="p-2" md="auto">
              <Button variant="outline-light" type="submit">
                Subscribe
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
      <Row className="m-3" style={{ fontSize: '14px' }}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
          distinctio earum repellat quaerat voluptatibus placeat nam, commodi
          optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi
          voluptate quas.
        </p>
      </Row>
      <Row className="mb-3 justify-content-center">
        <Col className="mb-5 mx-5 col-sm-3 col-6">
          <h6 className="text-uppercase">
            <strong>Explore</strong>
          </h6>
          <ul className="list-unstyled mb-0">
            <li>
              <Link className={styles.link} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={styles.link} to="/">
                About DressCode
              </Link>
            </li>
            <li>
              <Link className={styles.link} to="/">
                Blog
              </Link>
            </li>
            <li>
              <Link className={styles.link} to="/">
                Careers
              </Link>
            </li>
          </ul>
        </Col>
        <Col className="mb-5 col-sm-3 col-6">
          <h6 className="text-uppercase">
            <strong>Let Us Help You</strong>
          </h6>
          <ul className="list-unstyled mb-0">
            <li>
              <Link className={styles.link} to="/">
                Your Account
              </Link>
            </li>
            <li>
              <Link className={styles.link} to="/">
                Your Orders
              </Link>
            </li>
            <li>
              <Link className={styles.link} to="/">
                Shipping Rates & Policies
              </Link>
            </li>
            <li>
              <Link className={styles.link} to="/">
                Returns & Replacements
              </Link>
            </li>
          </ul>
        </Col>
        <Col className="mb-5 mx-5 col-sm-3 col-12">
          <h6 className="text-uppercase">
            <strong>Contact us</strong>
          </h6>
          <p>
            2795 Cunningham Court Rochester <br />
            Hills 48306 Michigan
            <br />
            <a
              href="mailto:support@company.com"
              className="text-decoration-none"
            >
              support@company.com
            </a>
          </p>
        </Col>
      </Row>
      <Row className="pt-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <p>© 2023 All rights reserved.</p>
      </Row>
    </Col>
  );
};

export default Footer;
