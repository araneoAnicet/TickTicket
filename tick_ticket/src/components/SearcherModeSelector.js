import React, {useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
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
                    <Nav.Link href="#" eventKey="oneWay" onClick={() => {setMode(false)}}>One-way</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="roundTrip" onClick={() => {setMode(true)}}>Roundtrip</Nav.Link>
                </Nav.Item>
                </Nav>
                <Searcher roundTripMode={mode}/>
            </Jumbotron>
    );
}

export default SearcherModeSelector;