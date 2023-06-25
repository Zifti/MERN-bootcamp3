import { Alert } from 'react-bootstrap'

function ErrorAlert({ messages }) {
  if (messages.length) {
    return (
      <Alert variant="danger">
        {messages.map((elem, index) => (
          <p key={index}>{elem}</p>
        ))}
      </Alert>
    )
  }
  return null
}

export default ErrorAlert