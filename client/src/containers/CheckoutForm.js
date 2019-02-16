import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';

const url = 'http://localhost:9000/billing/charge';

const CheckoutForm = props => {
  const handleSubmit = async e => {
    const { token } = await props.stripe.createToken({ name: 'Name' });
    axios.post(url, { token: token.id, subType: props.subType }).then(res => {
      if (res.status === 200) {
        console.log('response', res.status);
        console.log('purchase complete!');
      }
      else {
        console.log('purchase failed');
      }
    })
      .catch(err => console.log());
  };

  return (
    <>
      <CardElement />
      <button onClick={handleSubmit}>Send</button>
    </>
  );
};

export default injectStripe(CheckoutForm);
