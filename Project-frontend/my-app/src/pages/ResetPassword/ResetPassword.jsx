import withLayouts from '../../HOC/WithLayouts'
import ResetPasswordForm from '../../components/Forms/ResetPasswordForm'
import { Row, Col } from 'react-bootstrap'

function ResetPassword() {
    return (
        <Row>
          <Col md={12}>
            <h1>Reset password</h1>
          </Col>
          <Col md={6}>
            <ResetPasswordForm />
          </Col>
        </Row>

    )
}

export default withLayouts(ResetPassword)