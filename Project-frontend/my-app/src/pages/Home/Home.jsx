import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from '../../store/slices/Authslice';
import styles from './Home.module.scss';

function Home() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the logoutSuccess action
    dispatch(logoutSuccess());
    // Perform any additional cleanup or redirection if needed
  };

  return (
    <div className={styles.background}>
    <div className={`cover-container d-flex w-100 h-100 p-3 mx-auto flex-column ${styles['cover-container']}`}>
      <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Brand>MERN Bootcamp - Dealership</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className={`justify-content-md-end ${styles['navbar-nav']}`}>
          <Nav>
            <Nav.Link as={Link} to="/" className={`nav-link active ${styles['nav-link']}`}>Home</Nav.Link>
            <Nav.Link as={Link} to="/dealerships" className={`nav-link ${styles['nav-link']}`}>Dealerships</Nav.Link>
            {isAuthenticated ? (
              <Button onClick={handleLogout} variant="dark" className={`nav-link ${styles['nav-link']}`}>Logout</Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className={`nav-link ${styles['nav-link']}`}>Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className={`nav-link ${styles['nav-link']}`}>Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <main className={`px-3 d-flex flex-column align-items-center justify-content-center ${styles.main}`}>
        <h1 className={styles.lead}>Dealerships</h1>
        <p className={`lead ${styles.lead}`}>MERN Bootcamp final project<br />Final project for MERN Bootcamp.</p>
        <Button as={Link} to="/dealerships" variant="secondary" size="lg" className={`font-weight-bold border-white bg-dark ${styles.button}`}>
          View Dealerships
        </Button>
      </main>

      <footer className={`mt-auto text-white-50 ${styles.footer}`}>
        <p>&copy; Ernest 2023</p>
      </footer>
    </div>
  </div>
  );
}

export default Home;
