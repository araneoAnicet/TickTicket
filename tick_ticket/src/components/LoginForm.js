import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function LoginForm(props) {

    if (!props.registrationFormIsSet) {
        return null;
    }

    return (
        <Form>
            <h1>
                Login
            </h1>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <ButtonGroup>
            <Button variant="success">
                Submit
            </Button>
            <Button variant="info" onClick={props.setRegistrationForm}>
                I do not have an account
            </Button>
        </ButtonGroup>
    </Form>
    );
}

export default LoginForm;