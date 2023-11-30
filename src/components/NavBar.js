import React from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand style={{ color: 'aqua', fontSize: '30px' }}>MyShop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* Use Nav.Link for the "Shop" link */}
                        <Nav.Link as={Link} to="/categories" style={{ color: 'white' }}>
                            Shop
                        </Nav.Link>
                        <NavDropdown title="Login" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                <Link to="/login">Login</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                <Link to="/register">SignUp</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
