import { Form, Button, Row, Alert, Spinner, Container } from 'react-bootstrap';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/userReducer';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError'
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    };

    fetch(`${API_URL}/auth/login`, options)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .then((data) => {
        if (data) {
          const user = data.user.email;
          const userId = data.user.id;
          setStatus('success');
          dispatch(logIn({ user, userId }));
          navigate('/');
        }
      })
      .catch((err) => {
        setStatus('serverError');
      });
  };

  return (
    <Container style={{ marginTop: '8rem' }}>
      <Row className="d-flex justify-content-center align-items-center fs-1">
        SIGN IN
      </Row>
      <Row className="p-3 justify-content-center">
        <Form className="col-12 col-md-7 col-lg-4" onSubmit={handleSubmit}>
          {status === 'success' && (
            <Alert variant="success">
              <Alert.Heading>Success</Alert.Heading>
              <p>You have been successfuly logged in!</p>
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
              <Alert.Heading>Incorrect data</Alert.Heading>
              <p>Login or password are incorrect.</p>
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

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
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
          <Button variant="dark" type="submit">
            Sign in
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default Login;
