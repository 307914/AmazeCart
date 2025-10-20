
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router';
import UserContextProvider, { UserContext } from './usercontextprovider';
import UseIsLoggedIn from './useIsLoggedIn';
import { END_POINTS, REQUEST_TYPE } from './axiosinstance';
import UseApi from './useAPi';
// import Cart from './cart';
import { Cart } from 'react-bootstrap-icons';
import { Badge } from 'react-bootstrap';

const NavScrollExample = () => {
  const { userdata } = useContext(UserContext);
  const { isLoggedIn } = UseIsLoggedIn();
  const { makeRequest } = UseApi(END_POINTS.USER.LOGOUT, REQUEST_TYPE.POST);
  const totalQuantity = userdata?.totalQuantity;

  return (
    <Navbar expand="md" bg="dark" data-bs-theme="dark" style={{ width: "100vw" }}>
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>AmazeKart</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link}>
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to='/' >
              Link
            </Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ?
              <>
                <Nav.Link as={Link} to='/cart/getcartitems'>
                  <Cart size={25}>
                    <Badge pill>{totalQuantity}</Badge>
                  </Cart>
                </Nav.Link>
                <Nav.Link onClick={() => makeRequest()}>Logout</Nav.Link></> :
              <> <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup"> Signup</Nav.Link> </>}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;