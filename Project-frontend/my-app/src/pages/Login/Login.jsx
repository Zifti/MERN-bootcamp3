import withLayouts from '../../HOC/WithLayouts'
import {Row, Col} from 'react-bootstrap'
import LoginForm from '../../components/Forms/LoginForm'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../store/slices/Authslice'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLoginSuccess = (results) => {
    dispatch(loginSuccess(results));
    console.log('dispatch')
    console.log(results)
    navigate('/');
  };


  return (
    <Row>
    <Col md={12}>
      <h1>Login</h1>
    </Col>
    <Col md={6}>
      <LoginForm onSuccess={onLoginSuccess} />
      <NavLink to="/forgot-password">Forgot Password</NavLink>
     
    </Col>
  </Row>
  )
}

export default withLayouts(Login)