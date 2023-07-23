import { NavLink, Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Form, Container, Dropdown } from 'react-bootstrap';
import {
  faUser,
  faMagnifyingGlass,
  faBasketShopping,
} from '@fortawesome/free-solid-svg-icons';
import './NavBar.scss';
import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const NavBar = () => {
  const user = true;
  let location = useLocation();
  const [vertScroll, setVertScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => setVertScroll(window.scrollY);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed={location.pathname === '/' ? 'top' : ''}
      sticky={location.pathname === '/' ? '' : 'top'}
      variant="dark"
      className={
        location.pathname !== '/' || vertScroll > 300 ? 'text-bg-dark' : ''
      }
    >
      <Container className="mx-auto justify-content-between clearfix">
        <Navbar.Brand href="/">DressCode</Navbar.Brand>

        <Form className="py-2 col-12 col-md-6 d-flex mx-auto mx-lg-5 order-last order-md-0 text-center justify-content-center">
          <Form.Control
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <Button variant="link" className="text-white">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </Form>
        <Col className="d-flex col-lg-auto justify-content-end order-lg-last">
          <Dropdown>
            <Dropdown.Toggle variant="link" className="text-white mx-2">
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {!user && (
                <Dropdown.Item className="text-center" as={Link} to="/login">
                  Sign in
                </Dropdown.Item>
              )}
              {!user && (
                <Dropdown.Item className="text-center" as={Link} to="/register">
                  Sign up
                </Dropdown.Item>
              )}
              {user && (
                <Dropdown.Item className="text-center" as={Link} to="/">
                  My Orders
                </Dropdown.Item>
              )}
              {user && (
                <Dropdown.Item className="text-center" as={Link} to="/">
                  Watchlist
                </Dropdown.Item>
              )}
              {user && <Dropdown.Divider />}
              {user && (
                <Dropdown.Item className="text-center" as={Link} to="/logout">
                  Sign out
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="link" className="text-white mx-2" as={Link} to="/">
            <FontAwesomeIcon icon={faBasketShopping} />
          </Button>
        </Col>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="text-center justify-content-center"
        >
          <Nav>
            <Nav.Link className="px-3" as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link className="px-3" as={NavLink} to="/">
              Categories
            </Nav.Link>
            <Nav.Link className="px-3" as={NavLink} to="/">
              Sales
            </Nav.Link>
            <Nav.Link className="px-3" as={NavLink} to="/">
              Blog
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
