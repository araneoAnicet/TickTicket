import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Bus from '../Bus30.png';
import Plane from '../Plane30.png';
import Train from '../Train30.png';


function SearcherNav(props) {
    return (
        <div>
            <h6>Plan your trip!</h6>
            <Nav justify variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link href="/home"><img src={Train}></img>Train</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1"><img src={Plane}></img>Plane</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">
                <img src={Bus}></img>Bus
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-3">
                Any
                </Nav.Link>
            </Nav.Item>
            </Nav>
        </div>
    );
}

export default SearcherNav;