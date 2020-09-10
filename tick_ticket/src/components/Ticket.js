import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Train from '../Train100.png';
import Bus from '../Bus100.png';
import Plane from '../Plane100.png';


class Ticket extends React.Component {

    constructor(props) {
        super(props);
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
            transportIcons: {
                train: Train,
                bus: Bus,
                plane: Plane
            },
            icon: Train,
            selectButton: this.selectButtonComponent()
        }
    }

    selectButtonComponent() {
        return (
            <Button size="lg" variant="success">
                Select
            </Button>
        ); 
    }

    deselectButtonComponent() {
        return (
            <Button size="lg" variant="primary">
                deselect
            </Button>
        );
    }

    render() {
        return (
            <Jumbotron style={this.state.ticketBackgoundColor}>
                <Container>
                    <Row>
                        <Col>
                            <h6>
                                <span>Ticket </span>
                                <span className="text-danger">#{this.props.id}</span>
                                </h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <img src={this.state.icon} alt=""></img>
                        </Col>
                        <Col>
                            <p>
                                Departure:
                            </p>
                            <h3>
                                {this.props.departureDate}
                            </h3>
                        </Col>
                        <Col>
                            <p>
                                Arrive:
                            </p>
                            <h3>
                                {this.props.arriveDate}
                            </h3>
                        </Col>
                        <Col>
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
                        <Col/>
                        <Col>
                            <h2 className="text-danger">
                                {this.props.departureCityName}
                            </h2>
                        </Col>
                        <Col>
                        <h2 className="text-danger">
                            {this.props.arriveCityName}
                        </h2>
                        </Col>
                        <Col>
                            <ButtonGroup>
                            <Button size="lg" variant="danger">
                                Buy
                            </Button>
                            {this.state.selectButton}
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        );
    }
}

export default Ticket;