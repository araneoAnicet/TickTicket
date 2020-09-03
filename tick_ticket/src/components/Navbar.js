import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../logo192.png';

function NavBar(props) {
  return (
    <Navbar collapseOnSelect fixed={'top'} sticky={'top'} expand="lg" bg="light" variant="light">
  <Navbar.Brand href="#home"><img src={logo} alt=""></img></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link className="ml-auto" href="#home">Home</Nav.Link>
      <Nav.Link className="ml-auto" href="#TopTrips">Top trips</Nav.Link>
      <Nav.Link className="ml-auto" href="#MyTickets"><Button variant="danger">My Tickets</Button></Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  );
}

export default NavBar;