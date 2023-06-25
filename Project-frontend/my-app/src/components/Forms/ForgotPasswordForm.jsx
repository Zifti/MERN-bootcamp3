import { Form, Button } from 'react-bootstrap';
import ErrorAlert from '../Alerts/ErrorAlerts';
import { useState } from 'react';
import { ENDPOINTS, apiCall } from '../../lib/Api';
import { useNavigate } from 'react-router';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];

    if (!email) {
      errors.push('Email cannot be empty!!');
    }
    if (errors.length) {
      setErrorMessages(errors);
      return;
    }

    const data = {
      email,
    };

    
      const response = await apiCall(ENDPOINTS.forgotPassword, { data });
      console.log(data)
      console.log(response)
        if(response && response.success){
          <h1>Please check the email for further instructions</h1>;
          navigate('/login')
        } else {
          setErrorMessages(['Something Went Wrong!'])
        }
  };

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
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default ForgotPasswordForm;
