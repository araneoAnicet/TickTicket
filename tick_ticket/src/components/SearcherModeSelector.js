import React, {useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import InputGroup from 'react-bootstrap/InputGroup';
import '../style.css';
import Searcher from './Searcher';


function SearcherModeSelector(props) {
    function deleteButtonComponent() {
        return (
            <Button variant="light" size="sm" style={{float: 'right'}}>
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
            </Button>
        );
    }
    function roundTripComponent(props) {
        return (
                
                <Row style={{ marginTop: '1em' }}>
                    <Col xl={4} lg={4} md={4} sm={4}>
                        <InputGroup>
                        <Form.Control placeholder="To.." disabled/>
                        <InputGroup.Append>
                            <InputGroup.Text>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg>
                            </InputGroup.Text>
                        </InputGroup.Append>
                        </InputGroup>
                    
                  
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={4}>
                        <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control placeholder="From.." disabled/>
                        </InputGroup>
                  
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={4}>
                    <Button variant="outline-dark" block>
                    <svg style={{marginRight: '0.5em'}} width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-calendar-date" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
  <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"/>
</svg>
                        Date
                        </Button>
                    </Col>
                </Row>
                
        );
    }
    const [mode, setMode] = useState(null)  // null = one-way, else = Roundtrip
    let deleteButton = null;
    if (props.hasDeleteButton) {
        deleteButton = deleteButtonComponent();
    }

    return (
            <Jumbotron style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                {deleteButton}
                <Nav variant="pills" defaultActiveKey="oneWay">
                <Nav.Item>
                    <Nav.Link href="#" eventKey="oneWay" onClick={() => {setMode(null)}}>One-way</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="roundTrip" onClick={() => {setMode(roundTripComponent())}}>Roundtrip</Nav.Link>
                </Nav.Item>
                </Nav>
                <Searcher tripMode={mode}/>
            </Jumbotron>
    );
}

export default SearcherModeSelector;