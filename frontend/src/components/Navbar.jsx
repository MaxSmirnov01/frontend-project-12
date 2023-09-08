import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import routes from '../routes';

const NavbarComponent = () => (
  <Navbar bg="white" expand="lg" className="shadow-sm">
    <Container>
      <Navbar.Brand as={Link} to={routes.mainPath()}>
        Hexlet Chat
      </Navbar.Brand>
    </Container>
  </Navbar>
);

export default NavbarComponent;
