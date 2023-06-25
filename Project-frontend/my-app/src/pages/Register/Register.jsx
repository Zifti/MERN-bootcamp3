import withLayouts from '../../HOC/WithLayouts';
import RegisterForm from '../../components/Forms/RegisterForm';
import { Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function Register() {
  const navigate = useNavigate()
  const [successMessage, setSuccessMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setIsRegistered(true);
  };

  const handleHomeButtonClick = () => {
    navigate('/')
  };

  return (
    <Row>
      <Col md={12}>
        {!isRegistered && <h1>Register</h1>}
        {successMessage && (
          <>
            <div className="success-message">{successMessage}</div>
            <Button variant="primary" onClick={handleHomeButtonClick}>
              Go to Home
            </Button>
          </>
        )}
      </Col>
      <Col md={6}>
        {!isRegistered && <RegisterForm handleSuccess={handleSuccess} />}
      </Col>
    </Row>
  );
}

export default withLayouts(Register);
