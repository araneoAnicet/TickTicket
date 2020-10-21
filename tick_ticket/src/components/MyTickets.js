import React, {useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import '../style.css';
import config from './Config';


function MyTickets(props) {

    const [cartIsSelected, setCartIsSelected] = useState(true)
    const [boughtTickets, setBoughtTickets] = useState([]);

    function handleSelect(event) {
        setCartIsSelected(event === 'cart');
        fetch(`${config.backendHost}/api/history`, {
            method: 'GET',
            mode: 'cors',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.bought_tickets) {
                setBoughtTickets(data.bought_tickets);
            }
        });
    }

    function historyTicketsComponent() {

        if (cartIsSelected) {
            return null;
        }
        return (
            <div>
                {
                    Array.from(boughtTickets).map((item) => {
                        return <Container>
                            <Row>
                                <Col>
                                <p>
                                    #<span className="text-danger">{item.ticket.id}</span>
                                </p>
                                </Col>
                                <Col>
                                Transport: <span className="text-danger">{item.ticket.transport_name}</span>
                                </Col>
                                <Col>
                                <p>
                                    Carrier: <span className="text-danger">{item.ticket.carrier.name}</span>
                                </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                From:
                                <p>
                                    <strong className="text-danger">{item.ticket.departure_city.name}</strong>
                                    <strong> {item.ticket.departure_date} </strong>
                                    <strong className="text-danger">{item.ticket.departure_time.slice(0, 5)}</strong>
                                </p>
                                </Col>
                                <Col>
                                To:
                                <p>
                                    <strong className="text-danger">{item.ticket.arrive_city.name}</strong>
                                    <strong> {item.ticket.arrive_date} </strong>
                                    <strong className="text-danger">{item.ticket.arrive_time.slice(0, 5)}</strong>
                                </p>
                                </Col>
                                <Col>
                                <h3>
                                        <span className="text-danger">{item.ticket.price}</span> <span>{item.ticket.currency_name}</span>
                                    </h3>
                                </Col>
                                <Col>
                                    <p>bought on: {item.bought_on_time}</p>
                                    <p>{item.bought_on_date}</p>
                                </Col>
                            </Row>
                            <hr/>
                        </Container>
                        })
                    }
            </div>
        );
    }

    function cartMessageComponent() {
        if (!cartIsSelected) {
            return null;
        }
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
        if (!cartIsSelected) {
            return null;
        }
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

    function buyAllTicketsComponent() {
        if (!cartIsSelected) {
            return null;
        }
        if (props.tickets.size !== 0) {
            var totalPrice = 0;
            for (var ticket of props.tickets) {
                totalPrice += ticket.price;
            }
            return (
                <Container style={{ marginTop: '2em' }}>
                    <Row>
                        <Col/>
                        <Col>
                            <h4>
                                Total price:
                            </h4>
                        </Col>
                        <Col>
                            <h4>
                                <span className="text-danger">{totalPrice} </span> <span>{props.tickets.values().next().value.currencyName}</span>
                            </h4>
                        </Col>
                        <Col>
                            <Button size="lg" variant="danger">
                                Buy all
                                <svg style={{ marginLeft: '0.5em' }} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cash-stack" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 3H1a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1h-1z"/>
                                <path fillRule="evenodd" d="M15 5H1v8h14V5zM1 4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H1z"/>
                                <path d="M13 5a2 2 0 0 0 2 2V5h-2zM3 5a2 2 0 0 1-2 2V5h2zm10 8a2 2 0 0 1 2-2v2h-2zM3 13a2 2 0 0 0-2-2v2h2zm7-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                                </svg>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            );
        }
        return null;
    }


    return (
        <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="modal-90w"
        >
            <Modal.Body>
            <Container style={{ marginTop: '2em' }}>
            <Col md={3} lg={3}/>
            <Col>
                
                    <Nav justify fill variant="tabs" defaultActiveKey="cart" onSelect={handleSelect}>
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
                    {buyAllTicketsComponent()}
                    {historyTicketsComponent()}
                
            </Col>
            <Col md={3} lg={3}/>
        </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant="primary">
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default MyTickets;