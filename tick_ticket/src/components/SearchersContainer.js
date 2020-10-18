import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import Searcher from './Searcher';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import config from './Config';


function SearchersContainer(props, ref) {
    
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
        props.showTickets();
        let searchersData = searchers.map((searcher) => {
            let data = searcher.reference.current.getData();
            return {
                mode: data.mode,
                from_city: data.from,
                to_city: data.to,
                one_way_date: data.oneWayDate,
                round_trip_date: data.roundTripDate,
                transport_name: data.transportName
            }
        });
        searchersData = JSON.stringify(searchersData);
        fetch(`${config.backendHost}/api/search_tickets`, {
            method: 'POST',
            mode: 'cors',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: searchersData
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(`RESPONSE DATA FROM SEARCHERS: ${data}`);
        })
    }

    return (
        <div style={{ marginTop: '2%' }} ref={ref}>
            <Container fluid={true}>
      <Row>
        <Col>
        </Col>
       <Col xl="8" lg="8" md="10" sm="12" xs="12">
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
            <Button variant="success" block onClick={addSearcher}>
                + Add trip route +
            </Button>
            <Button variant="danger" block onClick={showSearchersData} style={{ marginTop: '1em' }}>
                Find all tickets!
                </Button>
       </Col>
       <Col>
       </Col>
      </Row>
      </Container>
        </div>
    );
}
const SearchersContainerReference = React.forwardRef(SearchersContainer);
export default SearchersContainerReference;