import React, {useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Bus from '../Bus30.png';
import Plane from '../Plane30.png';
import Train from '../Train30.png';


function SearcherNav(props) {

    function checkMark(props) {
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
      fill-rule="evenodd"
      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
        );
    }

    const [transport, setTransport] = useState({
        train: null,
        plane: null,
        bus: null,
        any: checkMark()
    });
    function handleSelect(event) {
        if (event === 'train') {
            setTransport({
                train: checkMark(),
                plane: null,
                bus: null,
                any: null
            });
        } else if (event === 'plane') {
            setTransport({
                train: null,
                plane: checkMark(),
                bus: null,
                any: null
            });
        } else if (event === 'bus') {
            setTransport({
                train: null,
                plane: null,
                bus: checkMark(),
                any: null
            });
        } else if (event === 'any') {
            setTransport({
                train: null,
                plane: null,
                bus: null,
                any: checkMark()
            })
        }
    }
    return (
        <div>
            <Nav justify variant="tabs" defaultActiveKey="any" onSelect={handleSelect}>
            <Nav.Item>
                <Nav.Link eventKey="train"><img src={Train}></img>Train {transport.train} </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="plane"><img src={Plane}></img>Plane {transport.plane} </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="bus">
                <img src={Bus}></img>Bus {transport.bus}
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="any">
                Any {transport.any}
                </Nav.Link>
            </Nav.Item>
            </Nav>
        </div>
    );
}

export default SearcherNav;