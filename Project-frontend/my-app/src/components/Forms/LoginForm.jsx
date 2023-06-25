import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { ENDPOINTS, apiCall } from '../../lib/Api'
import ErrorAlert from '../../components/Alerts/ErrorAlerts'

function LoginForm({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessages, setErrorMessages] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = []
    if (!username) {
      errors.push('Email cannot be empty!')
    }
    if (!password) {
      errors.push('Password cannot be empty!')
    }
    if (errors.length) {
      setErrorMessages(errors)
      return
    }
    const data = {
      username, 
      password,
    }

    
      const response = await apiCall(ENDPOINTS.login, { data })
  
      console.log(data)
      console.log(response)
        if(response && response.success){
          onSuccess(response)
        } else {
          setErrorMessages(['Something Went Wrong!'])
        }
       
  };

  return (
    <>
      <ErrorAlert messages={errorMessages} />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            type="text"
            placeholder="Username"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default LoginForm
