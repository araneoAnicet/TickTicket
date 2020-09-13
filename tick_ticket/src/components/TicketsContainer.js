import React, {useState} from 'react'
import {v4 as uuidv4} from 'uuid';
import Ticket from './Ticket';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import CarrierIcon from '../carrierIcon.png';


function TicketsContainer(props) {
    const initialTicketsList = [
        {
            id: 0,
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
            reference: React.createRef()
        }
    ];

    const [tickets, setTickets] = useState(initialTicketsList);

    return (
        <div>
            <hr/>
      <h2 className="text-center">
        Recommended tickets
      </h2>
      <Container fluid style={{ marginTop: '2em' }}>
            <Row>
                <Col/>
                <Col xl="8" lg="8" md="10" sm="12" xs="12">
                <Button block variant="success" style={{ marginBottom: '1em' }}>
                    Add all selected tickets to cart!
                    <svg style={{ marginLeft: '0.5em' }} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cart-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM4 14a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm7 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                    </svg>
                </Button>
                {
                    tickets.map((item) => {
                        return (
                            <
                            Ticket
                                key={uuidv4()}
                                id={item.id}
                                ref={item.reference}
                                departureTime={item.departureTime}
                                arriveTime={item.arriveTime}
                                departureDate={item.departureDate}
                                arriveDate={item.arriveDate}
                                departureCityName={item.departureCityName}
                                arriveCityName={item.arriveCityName}
                                price={item.price}
                                currencyName={item.currencyName}
                                carrierIcon={item.carrierIcon}
                                carrierName={item.carrierName}
                            />
                        );
                    })
                }
            
            </Col>
            <Col/>
            </Row>
        </Container>
        </div>
    );

}


export default TicketsContainer;