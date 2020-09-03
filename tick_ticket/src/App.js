import React from 'react';
import NavBar from './components/Navbar';
import SearcherModeSelector from './components/SearcherModeSelector';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import './App.css';

function App() {
  return (
    <div>
      <NavBar/>
      <Container fluid={true}>
      <Row>
        <Col>
        </Col>
       <Col lg="10" md="10" sm="10" xl="10" xs="10">
       <SearcherModeSelector/>
       </Col>
       <Col>
       </Col>
      </Row>
      </Container>
    </div>
  );
}

export default App;
