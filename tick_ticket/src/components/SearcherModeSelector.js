import React  from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import '../style.css';
import Bus from '../Bus30.png';
import Plane from '../Plane30.png';
import Train from '../Train30.png';


class SearcherModeSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            mode: props.mode,
            from: props.from,
            to: props.to,
            oneWayDate: props.oneWayDate,
            roundTripDate: props.roundTripDate,
            transportName: props.transportName,
            transport: {
                train: null,
                plane: null,
                bus: null,
                any: this.checkMark()
            }
        }

        this.setFrom = this.setFrom.bind(this);
        this.setMode = this.setMode.bind(this);
        this.setTo = this.setTo.bind(this);
        this.setTransport = this.setTransport.bind(this);
        this.setTransportName = this.setTransportName.bind(this);
        this.onFromChange = this.onFromChange.bind(this);
        this.onToChange = this.onToChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.getData = this.getData.bind(this);

    }

    getData() {
        return {
            mode: this.state.mode,
            from: this.state.from,
            to: this.state.to,
            oneWayDate: this.state.oneWayDate,
            roundTripDate: this.state.roundTripDate,
            transportName: this.state.transportName
        };
    }

    roundTripComponent() {
        return (
                
                <Row style={{ marginTop: '1em' }}>
                    <Col xl={4} lg={4} md={4} sm={4}>
                        <InputGroup>
                        <Form.Control value={this.state.to} placeholder="To.." disabled/>
                        <InputGroup.Append>
                            <InputGroup.Text>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                            </InputGroup.Text>
                        </InputGroup.Append>
                        </InputGroup>
                    
                  
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={4}>
                        <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control value={this.state.from} placeholder="From.." disabled/>
                        </InputGroup>
                  
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={4}>
                    <Button variant="outline-dark" block>
                    <svg style={{marginRight: '0.5em'}} width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-calendar-date" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"/>
                    </svg>
                        Date
                        </Button>
                    </Col>
                </Row>
                
        );
    }

    deleteButtonComponent() {
        return (
            <Button variant="light" size="sm" style={{float: 'right'}} onClick={() => {this.props.removeSearcher(this.props.id)}}>
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </Button>
        );
    }

    checkMark() {
        return (
            <svg
            style={{marginLeft: '1em'}}
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-check-circle-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
      <path
      fillRule="evenodd"
      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
        );
    }

    setMode(mode) { // false = one-way, true = Roundtrip
        this.setState({
            mode: mode
        });
    }

    setFrom(from) {
        this.setState({
            from: from
        });
    }

    setTo(to) {
        this.setState({
            to: to
        });
    }

    setTransportName(transportName) {
        this.setState({
            transportName: transportName
        });
    }

    setTransport(transport) {
        this.setState({
            transport: transport
        });
    }

    handleSelect(event) {
        if (event === 'train') {
            this.setTransport({
                train: this.checkMark(),
                plane: null,
                bus: null,
                any: null
            });
        } else if (event === 'plane') {
            this.setTransport({
                train: null,
                plane: this.checkMark(),
                bus: null,
                any: null
            });
        } else if (event === 'bus') {
            this.setTransport({
                train: null,
                plane: null,
                bus: this.checkMark(),
                any: null
            });
        } else if (event === 'any') {
            this.setTransport({
                train: null,
                plane: null,
                bus: null,
                any: this.checkMark()
            })
        }
        this.setTransportName(event);
    }


    onFromChange(event) {
        this.setFrom(event.target.value);
    }

    onToChange(event) {
        this.setTo(event.target.value);
    }

    render() {
        let tripMode = null;
        if (this.state.mode) {
            tripMode = this.roundTripComponent();
        }

        let deleteButton = null;
        if (this.props.hasDeleteButton) {
            deleteButton = this.deleteButtonComponent();
        }

        return (
            <Jumbotron style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                {deleteButton}
                <Nav variant="pills" defaultActiveKey="oneWay">
                <Nav.Item>
                    <Nav.Link href="#" eventKey="oneWay" onClick={() => {this.setMode(false)}}>One-way</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="roundTrip" onClick={() => {this.setMode(true)}}>Roundtrip</Nav.Link>
                </Nav.Item>
                </Nav>


                <Nav justify variant="tabs" defaultActiveKey="any" onSelect={this.handleSelect}>
                    <Nav.Item>
                        <Nav.Link eventKey="train"><img src={Train} alt="train"></img>Train {this.state.transport.train} </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="plane"><img src={Plane} alt="plane"></img>Plane {this.state.transport.plane} </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="bus">
                        <img src={Bus} alt="bus"></img>Bus {this.state.transport.bus}
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="any">
                        Any {this.state.transport.any}
                        </Nav.Link>
                    </Nav.Item>
            </Nav>

                
                <Form style={{ margitBottom: '5em' }}>
                <Row>
                    <Col xl={4} lg={4} md={4} sm={4}>
                        <InputGroup>
                            <Form.Control onChange={this.onFromChange} placeholder="From.." />
                            <InputGroup.Append>
                            <InputGroup.Text>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                            </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={4}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                </svg>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control onChange={this.onToChange} placeholder="To.." />
                        </InputGroup>
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={4}>
                    <Button variant="outline-dark" block>
                    <svg style={{marginRight: '0.5em'}} width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-calendar-date" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"/>
                    </svg>
                        Date
                        </Button>
                    </Col>
                </Row>
                {tripMode}
                </Form>


                <Row style={{ marginTop: '1em'}}>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={4}>
                    <Button variant="danger" block onClick={() => {console.log('Find button is pressed!');}}>Find!</Button>
                    </Col>
                </Row>
            </Jumbotron>
    );
    }
}

export default SearcherModeSelector;