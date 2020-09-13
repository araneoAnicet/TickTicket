import React, {useState} from 'react'
import {v4 as uuidv4} from 'uuid';
import Ticket from './Ticket';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


function TicketsContainer(props) {
    const [maxTicketIndex, setMaxTicketIndex] = useState(0);


    const initialTicketsList = [
        {
            id: maxTicketIndex,
            departureTime: '1:12',
            arriveTime: '5:30',
            price: 58,
            currencyName: 'USD',
            departureCityName: 'Madrid',
            arriveCityName: 'Minsk',
            reference: React.createRef()
        }
    ];

    const [tickets, setTickets] = useState(initialTicketsList);


    function increaceTicketIndex() {
        setMaxTicketIndex(maxTicketIndex + 1);
    }

    function addTicket(newTicket) {
        increaceTicketIndex();
        setTickets([
            ...tickets,
            newTicket
        ]);
    }


    return (
        <Container fluid style={{ marginTop: '2em' }}>
            <Row>
                <Col/>
                <Col xl="6" lg="6" md="6" sm="12" xs="12">
                
                {
                    tickets.map((item) => {
                        return (
                            <
                            Ticket
                                key={uuidv4()}
                                id={item.id}
                                departureTime={item.departureTime}
                                arriveTime={item.arriveTime}
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
    );

}


export default TicketsContainer;