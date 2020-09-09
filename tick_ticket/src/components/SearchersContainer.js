import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import Searcher from './Searcher';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


function SearchersContainer(props) {
    
    const [searchers, setSearchers] = useState([
        {
            id: uuidv4(),
            from: '',
            to: '',
            oneWayDate: '',
            roundTripDate: '',
            transportName: 'any',
            mode: false,  // true - roundtrip; false - one way
            reference: React.createRef(),
            hasDeleteButton: false
        }
    ]);
    
    function addSearcher() {
        setSearchers([
            ...searchers,
            {
                id: uuidv4(),
                from: '',
                to: '',
                oneWayDate: '',
                roundTripDate: '',
                transportName: 'any',
                mode: false,  // true - roundtrip; false - one way
                reference: React.createRef(),
                hasDeleteButton: true
            }
        ]);
    }

    function removeSearcher(searcherId) {
        const newSearchers = searchers.filter((currentSearcher) => currentSearcher.id !== searcherId);
        setSearchers(newSearchers);
    }

    function showSearchersData() {
        for (var searcher of searchers) {
            console.log(searcher.reference.current.getData());
        }
    }

    function findAllTicketsComponent() {
        return (
            <Button variant="danger" block onClick={showSearchersData}>
                Find all tickets!
                </Button>
        );
    }

    let findAllTicketsButton = null;
    if (searchers.length > 1) {
        findAllTicketsButton = findAllTicketsComponent();
    }

    return (
        <div style={{ marginTop: '2%' }}>
            <Container fluid={true}>
      <Row>
        <Col>
        </Col>
       <Col xl="6" lg="6" md="6" sm="12" xs="12">
       {
           searchers.map((searcher) => {
                return <Searcher
                    hasDeleteButton={searcher.hasDeleteButton}
                    key={searcher.id}
                    id={searcher.id}
                    mode={searcher.mode}
                    from={searcher.from}
                    to={searcher.to}
                    oneWayDate={searcher.oneWayDate}
                    roundTripDate={searcher.roundTripDate}
                    transportName={searcher.transportName}
                    ref={searcher.reference}
                    removeSearcher={removeSearcher}
                    />
           })
       }
       {findAllTicketsButton}
            <Button variant="success" block onClick={addSearcher}>
                + Add trip route +
            </Button>
       </Col>
       <Col>
       </Col>
      </Row>
      </Container>
        </div>
    );
}

export default SearchersContainer;