import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';



function RegistrationForm(props) {

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();
    const [serverResponseMessage, setServerResponseMessage] = useState(null);

    function usernameChangeHandle(e) {
        setUsername(e.target.value);
    }

    function emailChangeHandle(e) {
        setEmail(e.target.value);
    }

    function passwordChangeHandle(e) {
        setPassword(e.target.value);
    }

    function repeatPasswordChangeHandle(e) {
        setRepeatPassword(e.target.value);
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

    function sumbitRegistration() {
        var ajax_body = {
            username: username,
            email: email,
            password: password,
            repeat_password: repeatPassword
        }

        ajax_body = JSON.stringify(ajax_body);

        fetch('http://localhost:8000/api/auth/registration', {
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
            return response.json(`${ajax_body}`);
        }).then((data) => {
            if (data.message) {
                setServerResponseMessage(data.message);
            }
        });
    }

    if (props.registrationFormIsSet) {
        return null;
    }
    return (
        <Form>
            <h1>
                Registration
            </h1>

        <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder="Enter username" onChange={usernameChangeHandle} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={emailChangeHandle} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" onChange={passwordChangeHandle}/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Repeat password</Form.Label>
            <Form.Control type="password" placeholder="Repeat password" onChange={repeatPasswordChangeHandle}/>
        </Form.Group>
        <ButtonGroup>
            <Button variant="success" onClick={sumbitRegistration}>
                Submit
            </Button>
            <Button variant="info" onClick={props.setLoginForm}>
                I already have an account
            </Button>
        </ButtonGroup>
        {serverResponseMessageComponent()}
    </Form>
    );
}

export default RegistrationForm;