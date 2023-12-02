import React from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaUser } from 'react-icons/fa';
import '../App.css'



const NavBar = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand style={{ color: 'aqua', fontSize: '30px', fontFamily: '-moz-initial' }}>MyShop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/categories" style={{ color: 'white', marginRight: '20px' }}>
                            Shop
                        </Nav.Link>
                        <NavDropdown title={<span><FaUser style={{ marginBottom: '8px' }} /> Account</span>}>
                            <NavDropdown.Item>
                                <Link to="/login">
                                    <FaSignInAlt style={{ marginRight: '5px' }} /> Login
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to="/register">
                                    <FaUserPlus style={{ marginRight: '5px' }} /> SignUp
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
