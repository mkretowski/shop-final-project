import { Form, Button, Row, Alert, Spinner, Container } from 'react-bootstrap';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { setUserStatus } from '../../../redux/userReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError', 'loginError'

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, address, password, passwordRepeat }),
    };

    fetch(`${API_URL}/auth/register`, options)
      .then((res) => {
        if (res.status === 201) {
          setStatus('success');
          dispatch(setUserStatus('register'));
          return navigate('/');
        } else if (res.status === 400) {
          setStatus('clientError');
        } else if (res.status === 409) {
          setStatus('loginError');
        } else {
          setStatus('serverError');
        }
      })
      .catch((err) => {
        setStatus('serverError');
      });
  };

  return (
    <Container style={{ marginTop: '8rem' }}>
      <Row className="d-flex justify-content-center align-items-center fs-1">
        SIGN UP
      </Row>
      <Row className="p-3 justify-content-center">
        <Form className="col-12 col-md-7 col-lg-4" onSubmit={handleSubmit}>
          {status === 'success' && (
            <Alert variant="success">
              <Alert.Heading>Success</Alert.Heading>
              <p>You have been successfuly registered! You can now log in...</p>
            </Alert>
          )}

          {status === 'serverError' && (
            <Alert variant="danger">
              <Alert.Heading>Something went wrong...</Alert.Heading>
              <p>Unexpected error... Try again!</p>
            </Alert>
          )}

          {status === 'clientError' && (
            <Alert variant="danger">
              <Alert.Heading>Not enough data</Alert.Heading>
              <p>You have to fill all the fields.</p>
            </Alert>
          )}

          {status === 'loginError' && (
            <Alert variant="warning">
              <Alert.Heading>Login already in use</Alert.Heading>
              <p>You have to use other login.</p>
            </Alert>
          )}

          {status === 'loading' && (
            <Spinner
              animation="border"
              variant="primary"
              role="status"
              className="d-block mx-auto"
            />
          )}

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="Address"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPasswordRepeat">
            <Form.Label>Repeat password</Form.Label>
            <Form.Control
              type="password"
              value={passwordRepeat}
              onChange={(e) => {
                setPasswordRepeat(e.target.value);
              }}
              placeholder="Repeat password"
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Sign up
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default Register;
