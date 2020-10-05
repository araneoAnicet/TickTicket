import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import logo from '../logo192.png';
import TicketsContainer from './TicketsContainer';
import SearchersContainer from './SearchersContainer';
import MyTickets from './MyTickets';
import CarrierIcon from '../carrierIcon.png';
import MyVerticallyCenteredModal from './Modal'


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: new Set(),  // tickets in Cart
      showModal: false
    }
    this.addTicket = this.addTicket.bind(this);
    this.removeTicket = this.removeTicket.bind(this);
    this.myTicketsReference = React.createRef();
    this.searchersContainerReference = React.createRef();
  }

  setShowModal(showModal) {
    console.log(`Pressed show Modal: ${showModal}`);
    this.setState({
      showModal: showModal
    });
  }

  addTicket(ticket) {
    var newTickets = this.state.tickets;
    newTickets.add(ticket);
    this.setState({
      tickets: newTickets
    });
  }

  removeTicket(ticket) {
    var newTickets = this.state.tickets;
    newTickets.delete(ticket);
    ticket.isInCart = false;
    this.setState({
      tickets: newTickets
    });
  }

  render() {
    return (
      <div>
      <Navbar collapseOnSelect fixed={'top'} sticky={'top'} expand="lg" bg="light" variant="light">
    <Navbar.Brand href="home"><img src={logo} alt=""></img></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
    <Navbar.Collapse id="responsive-navbar-nav">         
      <Nav className="ml-auto">
        <Nav.Link className="ml-auto" onClick={() => {window.scrollTo(0, this.searchersContainerReference.current.offsetBottom)}}>
          Home
          </Nav.Link>
          <Nav.Link className="ml-auto" onClick={() => {this.setShowModal(true)}}>
            Payments
            <svg style={{ marginLeft: '0.5em' }} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cash-stack" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 3H1a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1h-1z"/>
            <path fillRule="evenodd" d="M15 5H1v8h14V5zM1 4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H1z"/>
            <path d="M13 5a2 2 0 0 0 2 2V5h-2zM3 5a2 2 0 0 1-2 2V5h2zm10 8a2 2 0 0 1 2-2v2h-2zM3 13a2 2 0 0 0-2-2v2h2zm7-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
          </svg>
          </Nav.Link>
        <Nav.Link className="ml-auto text-danger" onClick={() => {window.scrollTo(0, this.myTicketsReference.current.offsetTop)}}>
          My Tickets
          <svg style={{ marginLeft: '0.5em', marginBottom: '0.5em' }} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cart4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
    </svg>
          <Badge pill variant="primary">
            {this.state.tickets.size}
          </Badge>
          </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  <MyVerticallyCenteredModal
      show={this.state.showModal}
      onHide={() => {this.setShowModal(false)}}
    />
  <SearchersContainer ref={this.searchersContainerReference}/>
      <hr/>
      <h2 className="text-center">
          Recommended tickets
      </h2>
      <TicketsContainer
        initialTicketsList={[
          {
              id: 0,
              transportName: 'plane',
              departureTime: '1:12',
              arriveTime: '7:30',
              departureDate: '24 aug 2019',
              arriveDate: '24 aug 2019',
              price: 58,
              currencyName: 'USD',
              departureCityName: 'Madrid',
              arriveCityName: 'Minsk',
              carrierIcon: CarrierIcon,
              carrierName: 'International carrier',
              isInCart: false,
              numberOfAvailableTickets: 93,
              reference: React.createRef()
          }
      ]}
        addTicket={this.addTicket}
        removeTicket={this.removeTicket}
      />
        <MyTickets
          ref={this.myTicketsReference}
          tickets={this.state.tickets}
          removeTicketFromCart={this.removeTicket}
          />
        
      </div>
    )
  }
}

export default NavBar;