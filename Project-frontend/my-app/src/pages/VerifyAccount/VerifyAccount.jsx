import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ENDPOINTS, apiCall } from '../../lib/Api';
import { useNavigate } from 'react-router-dom';

function VerifyAccount() {
  const params = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showButton, setShowButton] = useState(false); // New state to control button visibility

  useEffect(() => {
    const verifyAccount = async () => {
      const endpoint = ENDPOINTS.verifyAccount;
      endpoint.url += '/' + params.token;
      const response = await apiCall(endpoint);
      if (response.success) {
        setMessage('Account was successfully verified');
        setShowButton(true); // Show the button when the verification is successful
      } else {
        setMessage('Something went wrong!');
      }
    };
    verifyAccount();
  }, [params]);

  const handleButtonClick = () => {
    navigate('/'); // Redirect to the home page when the button is clicked
  };

  return (
    <div>
      {message}
      {showButton && <button onClick={handleButtonClick}>Go to Home</button>}
    </div>
  );
}

export default VerifyAccount;
