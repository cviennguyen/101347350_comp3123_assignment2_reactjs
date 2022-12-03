import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet } from "react-router-dom";

export default function Navigation() {
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <Container>
          <Navbar.Brand>Logo</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">List</Nav.Link>
          </Nav>
        </Container>
        <Container>
          <Nav className="me-auto">
            <a className="btn btn-primary mx-3" href="/login">
              Login
            </a>
            <a className="btn btn-secondary" href="/signup">
              Signup
            </a>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
