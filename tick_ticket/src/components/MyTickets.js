import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


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

    function cartTicketsComponent() {
        return (
            <div>
                {
                    Array.from(props.tickets).map((item) => {
                        return <Container>
                            <Row>
                                <Col>
                                <p>
                                    #<span className="text-danger">{item.id}</span>
                                </p>
                                </Col>
                                <Col>
                                Transport: <span className="text-danger">{item.transportName}</span>
                                </Col>
                                <Col>
                                <p>
                                    Carrier: <span className="text-danger">{item.carrierName}</span>
                                </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                From:
                                <p>
                                    <strong className="text-danger">{item.departureCityName}</strong>
                                    <strong> {item.departureDate} </strong>
                                    <strong className="text-danger">{item.departureTime}</strong>
                                </p>
                                </Col>
                                <Col>
                                To:
                                <p>
                                    <strong className="text-danger">{item.arriveCityName}</strong>
                                    <strong> {item.arriveDate} </strong>
                                    <strong className="text-danger">{item.arriveTime}</strong>
                                </p>
                                </Col>
                                <Col>
                                <h3>
                                        <span className="text-danger">{item.price}</span> <span>{item.currencyName}</span>
                                    </h3>
                                </Col>
                                <Col>
                                    <ButtonGroup>
                                    <Button variant="primary" onClick={() => {props.removeTicketFromCart(item)}}>
                                        <svg style={{ paddingBottom: '0.2em' }} width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-cart-x-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM4 14a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm7 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z"/>
                                        </svg>
                                    </Button>
                                        <Button variant="danger">
                                            Pay
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <hr/>
                        </Container>
                        })
                    }
            </div>
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
                    {cartTicketsComponent()}
                </Jumbotron>
            </Col>
            <Col md={3} lg={3}/>
        </Container>
    );
}

const MyTicketsReference = React.forwardRef(MyTickets);
export default MyTicketsReference;