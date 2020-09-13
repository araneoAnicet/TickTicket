import React, {useState} from 'react'
import {v4 as uuidv4} from 'uuid';
import Ticket from './Ticket';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


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
                
                {
                    tickets.map((item) => {
                        return (
                            <
                            Ticket
                                key={uuidv4()}
                                id={item.id}
                                departureTime={item.departureTime}
                                arriveTime={item.arriveTime}
                                departureDate={item.departureDate}
                                arriveDate={item.arriveDate}
                                departureCityName={item.departureCityName}
                                arriveCityName={item.arriveCityName}
                                price={item.price}
                                currencyName={item.currencyName}
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