import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import logo from '../logo192.png';

function NavBar(props) {
    return (
        <div>
            <Navbar bg="light" variant="light">
    <Navbar.Brand href="#home"><img src={logo} alt=""></img></Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Top Trips</Nav.Link>
      <Nav.Link href="#pricing"><Button variant="danger">My Tickets</Button></Nav.Link>
    </Nav>
  </Navbar>
        </div>
    );
}

export default NavBar;