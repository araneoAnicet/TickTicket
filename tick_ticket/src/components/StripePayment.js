import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import config from './Config';
import Alert from 'react-bootstrap/Alert';
import AppContext from './Context';

function CheckoutForm(props) {
    const stripe = useStripe();
    const elements = useElements();
    const context = useContext(AppContext);
    
    async function onFormSubmit(event) {
        event.preventDefault();
        if (!stripe || !elements) {
            return null;
        }

        const card = elements.getElement(CardElement);
        const stripeToken = await stripe.createToken(card);
        let ticket_ids = [...context.ticketsInCart].map((item) => {
            return item.id;
        });
        console.log('[Tickets to send', ticket_ids);
        let body = JSON.stringify({
            stripe_token: stripeToken.token.id,
            ticket_ids: ticket_ids  // add context here
        });
        console.log('[body]', JSON.parse(body));
        fetch(`${config.backendHost}/api/payments`, {
            method: 'POST',
            mode: 'cors',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: body
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log('[RECEIVED DATA]', data);
        });
    }
    return (
        <form onSubmit={onFormSubmit}>
            <CardElement/>
                <Alert variant="light">
                    Put your credit card information to finish payment!
                </Alert>
                <Button variant="success" type="submit">
                Submit payment!
            </Button>
        </form>
    );
}

let stripePublicKey = null;
fetch(`${config.backendHost}/api/payments`, {
    method: 'GET',
        mode: 'cors',
        dataType: 'json',
        contentType: 'application/json',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
}).then((response) => {
    return response.json();
}).then((data) => {
    stripePublicKey = data.publishable_key;
})
function StripePayment(props) {
    const stripePromise = loadStripe(stripePublicKey);
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm/>
        </Elements>
    );
};

export default StripePayment;

