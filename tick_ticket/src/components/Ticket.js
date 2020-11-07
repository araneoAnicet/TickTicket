import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Train from '../Train30.png';
import Bus from '../Bus30.png';
import Plane from '../Plane30.png';
import '../style.css'
import config from './Config';
import AppContext from './Context';


class Ticket extends React.Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        var transportIcon = 'any';
        if (props.transportName === 'plane') {
            transportIcon = Plane;
        } else if (props.transportName === 'train') {
            transportIcon = Train;
        } else if (props.transportName === 'bus') {
            transportIcon = Bus;
        } else {
            transportIcon = null
        }
        this.state = {
            backgroundStyle: {
                green: {
                    backgroundColor: 'rgba(186, 255, 173, 0.95)'
                },
                white: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)'
                },
                red: {
                    backgroundColor: 'rgba(255, 198, 198, 0.95)'
                }
            },
            ticketBackgoundColor: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)'
            },
            isSelected: false,
            icon: transportIcon
        }
        this.select = this.select.bind(this);
        this.deselect = this.deselect.bind(this);
        this.isSelected = this.isSelected.bind(this);
    }

    isSelected() {
        return this.state.isSelected;
    }

    addToCartButtonComponent() {
        return (
            <Button variant="danger" onClick={() => {this.props.addTicketToCart(this.props.id)}}>
                <svg style={{ paddingBottom: '0.2em' }} width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-cart-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM4 14a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm7 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
            </svg>
            </Button>
        );
    }

    removeFromCartButtonComponent() {
        return (
            <Button variant="primary" onClick={() => {this.props.removeTicketFromCart(this.props.id)}}>
                <svg style={{ paddingBottom: '0.2em' }} width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-cart-x-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM4 14a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm7 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z"/>
                </svg>
            </Button>
        );
    }

    selectButtonComponent() {
        return (
            <Button variant="success" onClick={this.select}>
                Select
            </Button>
        ); 
    }

    deselectButtonComponent() {
        return (
            <Button variant="primary" onClick={this.deselect}>
                Deselect
            </Button>
        );
    }

    select() {
        this.setState({
            isSelected: true,
            ticketBackgoundColor: this.state.backgroundStyle.green
        });
    }

    deselect() {
        this.setState({
            isSelected: false,
            ticketBackgoundColor: this.state.backgroundStyle.white
        });
    }

    render() {
        var selectButton = null;
        if (this.state.isSelected) {
            selectButton = this.deselectButtonComponent();
        } else {
            selectButton = this.selectButtonComponent();
        }

        var addToCartButton = null;
        if (this.props.isInCart) {
            addToCartButton = this.removeFromCartButtonComponent();
        } else {
            addToCartButton = this.addToCartButtonComponent();
        }

        return (
            <Jumbotron style={this.state.ticketBackgoundColor} className="has-shadow">
                <Container>
                    <Row>
                        <Col>
                            <h6>
                                <img src={this.state.icon} alt=""></img>
                                <span>Ticket </span>
                                <span className="text-danger">#{this.props.id}</span>
                                </h6>
                                <p>
                                    Tickets available: {this.props.numberOfAvailableTickets}
                                </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <img
                            style={{
                                maxWidth: '100px',
                                maxHeight: '100px'
                            }}
                             src={`${config.backendHost}/api/image/${this.props.carrierName.replaceAll(' ', '%20')}`} 
                             alt=""/>
                            <p>
                                {this.props.carrierName}
                            </p>
                        </Col>
                        <Col xs={4} sm={4} md={3}>
                                Departure:
                            <p>
                            {this.props.departureDate}
                            </p>
                            
                            <h3>
                                {this.props.departureTime}
                            </h3>
                        </Col>
                        <Col xs={4} sm={4} md={3}>
                        Arrive:
                            <p>
                            {this.props.arriveDate}
                            </p>
                           
                            <h3>
                                {this.props.arriveTime}
                            </h3>
                        </Col>
                        <Col xs={4} sm={4} md={4}>
                            <p>
                                Price:
                            </p>
                            <h3>
                                <span className="text-danger">{this.props.price}</span>
                                <span> {this.props.currencyName}</span>
                            </h3>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '1em' }}>
                        <Col md={2}/>
                        <Col xs={4} sm={4} md={3}>
                            <h3 className="text-danger">
                                {this.props.departureCityName}
                            </h3>
                        </Col>
                        <Col xs={4} sm={4} md={3}>
                        <h3 className="text-danger">
                            {this.props.arriveCityName}
                        </h3>
                        </Col>
                        <Col xs={4} sm={4} md={4}>
                            <ButtonGroup>
                            {addToCartButton}
                            {selectButton}
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        );
    }
}

export default Ticket;