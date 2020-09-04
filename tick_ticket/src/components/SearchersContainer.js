import React, {useState} from 'react';
import SearcherModeSelector from './SearcherModeSelector';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


function SearchersContainer(props) {
    const [searchers, setSearchers] = useState([]);
    function addSearcher() {
        setSearchers(searchers => [...searchers, <SearcherModeSelector hasDeleteButton={true}/>]);
    }
    return (
        <div>
            <Container fluid={true}>
      <Row>
        <Col>
        </Col>
       <Col xl="6" lg="6" md="6" sm="12" xs="12">
       <SearcherModeSelector hasDeleteButton={false}/>
       {searchers}
            <Button variant="outline-success" block onClick={addSearcher}>
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