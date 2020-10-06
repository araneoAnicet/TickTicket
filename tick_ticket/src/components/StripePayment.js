import React from 'react';
import Button from 'react-bootstrap/Button';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


function CheckoutForm(props) {
    const stripe = useStripe();
    return (
        <form>
            <CardElement/>
                <Button style={{ marginTop: '1em' }} variant="success" disabled={!stripe} block>
                    + add credit card
                </Button>
        </form>
    );
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

function StripePayment(props) {
    let STRIPE_PUBLIC_KEY;
fetch('http://localhost:8000/api/payments').then((response) => {
    return response.json;
}).then((data) => {
    STRIPE_PUBLIC_KEY = data.publishable_key
})

const stripePromise = loadStripe('pk_test_51HYYNpLkXC1j8tTzHz4Vh5QVso131zJmi0iRIh0FdlzPJoysUFAOwM0S5jKL2cRFGk7V8d9vcbk3keVTxrDPr61d00Jky1K0tV');
    return (
    <Elements stripe={stripePromise}>
        <CheckoutForm/>
    </Elements>
    );
};

export default StripePayment;

