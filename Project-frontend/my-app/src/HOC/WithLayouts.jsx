import Header from '../layouts/header';
import { Container } from 'react-bootstrap';
import Footer from '../layouts/footer';
import styles from './WithLayouts.module.scss'

const withLayouts = (Component) => {
  return (props) => {

    return (
      <>
        <Container className={styles.container}>
        <Header />
          <Component {...props} className={styles.content} />
        <Footer />
        </Container>
      </>
    );
  };
};

export default withLayouts;
