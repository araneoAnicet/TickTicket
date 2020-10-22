import React  from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../style.css';
import 'react-calendar/dist/Calendar.css';
import Bus from '../Bus30.png';
import Plane from '../Plane30.png';
import Train from '../Train30.png';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '../react-datepicker.css'
import {Typeahead} from 'react-bootstrap-typeahead';
import config from './Config';


class Searcher extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            showOneWayDate: false,
            showRoundTripDate: false,
            mode: props.mode,  // false - oneWay; true - roundTrip
            from: props.from,
            to: props.to,
            localOneWayDate: moment.now(),
            localRoundTripDate: moment.now(),
            oneWayDate: props.oneWayDate,
            roundTripDate: props.roundTripDate,
            transportName: props.transportName,
            cities: [],
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

    componentDidMount() {        
        fetch(`${config.backendHost}/api/list_cities`, {
            method: 'GET',
            mode: 'cors',
            dataType: 'json',
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({
                cities: data
            });
        });

    }
    getData() {
        let returnedState = {
            mode: this.state.mode,
            from: this.state.from,
            to: this.state.to,
            transportName: this.state.transportName
        };
        if (this.state.localOneWayDate != null) {
            returnedState.oneWayDate = moment(this.state.localOneWayDate).format('yyyy-MM-DD');
        }
        if (this.state.localRoundTripDate != null) {
            returnedState.roundTripDate = moment(this.state.localRoundTripDate).format('yyyy-MM-DD');
        }
        console.log(returnedState);
        return returnedState;
    }

    roundTripComponent() {
        return (
                
                <Row style={{ marginTop: '1em' }}>
                    <Col xl={4} lg={4} md={4} sm={4}>
                        <Form.Control value={this.state.to} placeholder="To.." disabled/>
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={4}>
                        <Form.Control value={this.state.from} placeholder="From.." disabled/>
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={4}>
                        Date:
                    <DatePicker
                    isClearable
                    selected={this.state.localRoundTripDate}
                    onChange={(newLocalRoundTripDate) => {this.setState({localRoundTripDate: newLocalRoundTripDate})}}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="select date"
                />
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


    onFromChange(city) {
        if (city instanceof Array) {
            this.setFrom(city[0].name);
        }
        if (city instanceof String) {
            this.setFrom(city);
        }
    }

    onToChange(city) {
        if (city instanceof Array) {
            this.setTo(city[0].name);
        }
        if (city instanceof String) {
            this.setTo(city);
        }
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
            <Jumbotron style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }} className="has-shadow">
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
                        
                            <Typeahead
                                id="basic-typeahead-single"
                                labelKey="name"
                                onChange={this.onFromChange}
                                options={this.state.cities}
                                placeholder="From.."
                                
                            />
                       
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={4}>
                        
                        <Typeahead
                                id="basic-typeahead-single"
                                labelKey="name"
                                onChange={this.onToChange}
                                options={this.state.cities}
                                placeholder="To.."
                                
                            />
                        
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={4}>
                        Date:
                    <DatePicker
                    isClearable
                    selected={this.state.localOneWayDate}
                    onChange={(newLocalOneWayDate) => {this.setState({localOneWayDate: newLocalOneWayDate})}}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="select date"
                />
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
                   
                    </Col>
                </Row>
            </Jumbotron>
    );
    }
}

export default Searcher;