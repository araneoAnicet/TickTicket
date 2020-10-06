import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import StripePayment from './StripePayment';

function MyVerticallyCenteredModal(props) {
    if (props.show) {
        return (
            <Modal
                show={props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
              <Modal.Body>
                <StripePayment/>
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