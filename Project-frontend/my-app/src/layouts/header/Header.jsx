import { Navbar, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../../store/slices/Authslice' 
import { useNavigate} from 'react-router-dom';



function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate('/dealerships');
  };


  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand href="#">MERN Bootcamp</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/dealerships">Dealerships</Nav.Link>
          <Nav.Link href="/dealerships/new">New Dealership</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          {isAuthenticated ? (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Sign Up</Nav.Link>
            </>
          )}
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
