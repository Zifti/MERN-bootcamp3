import { Form, Button } from 'react-bootstrap';
import ErrorAlert from '../../components/Alerts/ErrorAlerts';
import { useState } from 'react';
import { ENDPOINTS, apiCall } from '../../lib/Api';
import { useParams } from 'react-router-dom';

function ResetPasswordForm() {

    const params = useParams();

  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('')
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];

    if (!password) {
      errors.push('Password cannot be empty!');
    }
    if (!confirmpassword) {
        errors.push('Confirm password field cannot be empty');
    }
    if (password !== confirmpassword) {
        errors.push('Passwords do not match');
    }

    if (errors.length) {
      setErrorMessages(errors);
      return;
    }

    const data = {
      password
    };

    const endpoint = ENDPOINTS.resetPassword;
    endpoint.url += `/${params.token}`;
    console.log('endopint --------' + endpoint.url)

    const response = await apiCall(endpoint, {data});
      console.log(data)
      console.log(response)
        if(response && response.success){
            console.log('we did it')
        } else {
          setErrorMessages(['Something Went Wrong!'])
        }
  };

  return (
    <>
      <ErrorAlert messages={errorMessages} />
      <Form onSubmit={handleSubmit}>
        
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
        <Form.Group>
          <Form.Label htmlFor="confirmpassword">Password</Form.Label>
          <Form.Control
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            type="password"
            id="confirmpassword"
            placeholder="Confirm Password"
          />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default ResetPasswordForm;
