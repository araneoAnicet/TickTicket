import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

function MyVerticallyCenteredModal(props) {
    const [registrationFormIsSet, setRegistrationFormIsSet] = useState(false);

    if (props.show) {
        return (
            <Modal
                show={props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
              <Modal.Body>
                <RegistrationForm
                  registrationFormIsSet={registrationFormIsSet}
                  setLoginForm={() => {setRegistrationFormIsSet(true)}}
                  setTokenFunc={props.setTokenFunc}
                />
                <LoginForm
                  registrationFormIsSet={registrationFormIsSet}
                  setRegistrationForm={() => {setRegistrationFormIsSet(false)}}
                  setTokenFunc={props.setTokenFunc}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
          );
    }
    return null;
  }

  export default MyVerticallyCenteredModal;