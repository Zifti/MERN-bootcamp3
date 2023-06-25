import { Form, Button } from 'react-bootstrap';
import ErrorAlert from '../../components/Alerts/ErrorAlerts';
import { useState } from 'react';
import { ENDPOINTS, apiCall } from '../../lib/Api';

function RegisterForm({ setRegistered, handleSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];

    if (!email) {
      errors.push('Email cannot be empty!!');
    }

    if (!password) {
      errors.push('Passwords cannot be empty!');
    }
    if (!username) {
      errors.push('Username cannot be empty');
    }
    if (errors.length) {
      setErrorMessages(errors);
      return;
    }

    const data = {
      email,
      username,
      password,
    };

    const response = await apiCall(ENDPOINTS.register, { data });
    if (response && response.success) {
      handleSuccess(response.message);
    } else {
      setErrorMessages(['Something Went Wrong!']);
    }
  };

        
;

  return (
    <>
      <ErrorAlert messages={errorMessages} />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="email">Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );

  }
export default RegisterForm;
