import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../style.css';


function Searcher(props) {
    return (
        <div className="edges-margin">
            {props.children}

                <Form>
                <Row>
                    <Col>
                    <Form.Control placeholder="From.." />
                    <Form.Text className="text-muted">
                        From
                    </Form.Text>
                    </Col>
                    <Col>
                    <Form.Control placeholder="To.." />
                    <Form.Text className="text-muted">
                        To
                    </Form.Text>
                    </Col>
                    <Col>
                    <Button variant="outline-dark" block>Date</Button>
                    </Col>
                </Row>
                </Form>

        </div>
    );
}

export default Searcher;