import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

const CheckoutForm = props => {
  const handleSubmit = async e => {
    const { token } = await props.stripe.createToken({ name: 'testName' });
    console.log(token);
    console.log(props.subType);
  };

  return (
    <>
      <CardElement />
      <button onClick={handleSubmit}>Send</button>
    </>
  );
};

export default injectStripe(CheckoutForm);
