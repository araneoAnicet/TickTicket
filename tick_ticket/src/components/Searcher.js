import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../style.css'

function Searcher(props) {
    return (
        <div className="edges-margin">
            {props.children}
            <Form>
            <Row>
                <Col>
                <Form.Control placeholder="From.." />
                </Col>
                <Col>
                <Form.Control placeholder="To.." />
                </Col>
            </Row>
            </Form>
        </div>
    );
}

export default Searcher;