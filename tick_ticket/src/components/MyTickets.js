import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

function MyTickets(props, ref) {
    console.log(props.tickets)
    function cartMessageComponent() {
        if (props.tickets.size !== 0) {
            return (
                <p>
                    There are <span className="text-danger">{props.tickets.size}</span> tickets in cart 
                </p>
            );
        }
        return (
            <p>
                Ooouuups... Seems like you have not added any tickets to the cart.
            </p>
        );
    }

    return (
        <Container style={{ marginTop: '2em' }} ref={ref}>
            <Col md={3} lg={3}/>
            <Col>
                <Jumbotron className="bg-light">
                    <Nav fill variant="tabs" defaultActiveKey="cart">
                        <Nav.Item>
                            <Nav.Link eventKey="cart">
                                Cart
                                <svg style={{ marginLeft: '0.5em', marginBottom: '0.2em' }} width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-cart4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                                </svg>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="history">
                                History
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {cartMessageComponent()}
                </Jumbotron>
            </Col>
            <Col md={3} lg={3}/>
        </Container>
    );
}

const MyTicketsReference = React.forwardRef(MyTickets);
export default MyTicketsReference;