import withLayouts from '../../HOC/WithLayouts'
import DealershipForm from '../../components/Forms/DealershipForm'
import { Row, Col } from 'react-bootstrap'

function NewDealership() {
    return (
        <Row>
          <Col md={12}>
            <h1>Create New Dealership</h1>
          </Col>
          <Col md={6}>
            <DealershipForm />
          </Col>
        </Row>

    )
}

export default withLayouts(NewDealership)