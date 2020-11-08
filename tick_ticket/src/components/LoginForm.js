import React, {useState, useContext} from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import AppContext from './Context';
import config from './Config';
import Loading from './Loading';


function LoginForm(props) {
    const context = useContext(AppContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [serverResponseMessage, setServerResponseMessage] = useState(null);
    const [serverResponseIsLoading, setServerResponseIsLoading] = useState(false);


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
                <Alert style={{ marginTop: '1em' }} variant="info" className="text-center">
                    {serverResponseMessage}
                </Alert>
            );
        }
        return null;
    }

    function submit() {
        setServerResponseIsLoading(true);
        var ajax_body = {
            email: email,
            password: password
        }
        ajax_body = JSON.stringify(ajax_body);
        fetch(`${config.backendHost}/api/auth`, {
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
            console.log(data);
            if (data.message) {
                if (data.token) {
                    context.setToken(data.token);
                    context.setEmail(email);
                }
                setServerResponseMessage(data.message);
            }
        }).then(() => {
            setServerResponseIsLoading(false);
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
        <Loading color='#836eb3' loading={serverResponseIsLoading} height='3em' style={{ marginLeft: '50%', marginRight: '50%' }}>
            {serverResponseMessageComponent()}
        </Loading>
        
    </Form>
    );
}

export default LoginForm;