import React, {useState} from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


function LoginForm(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [serverResponseMessage, setServerResponseMessage] = useState(null);


    if (!props.registrationFormIsSet) {
        return null;
    }

    function emailChangeHandle(e) {
        setEmail(e.target.value);
    }

    function passwordChangeHandle(e) {
        setPassword(e.target.value);
    }

    function serverResponseMessageComponent() {
        if (serverResponseMessage) {
            return (
                <Alert variant="success" className="text-center">
                    {serverResponseMessage}
                </Alert>
            );
        }
        return null;
    }

    function submit() {
        var ajax_body = {
            email: email,
            password: password
        }
        ajax_body = JSON.stringify(ajax_body);
        fetch('http://localhost:8000/api/auth', {
            method: 'POST',
            mode: 'cors',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: ajax_body
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.message) {
                setServerResponseMessage(data.message);
            }
        });
    }

    return (
        <Form>
            <h1>
                Login
            </h1>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={emailChangeHandle}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={passwordChangeHandle}/>
        </Form.Group>
        <ButtonGroup>
            <Button variant="success" onClick={submit}>
                Submit
            </Button>
            <Button variant="info" onClick={props.setRegistrationForm}>
                I do not have an account
            </Button>
        </ButtonGroup>
        {serverResponseMessageComponent()}
    </Form>
    );
}

export default LoginForm;