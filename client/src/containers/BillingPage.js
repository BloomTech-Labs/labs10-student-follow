import React, { useState } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

const BillingPage = props => {
  const [subType, setSubType] = useState('');

  const handleChange = e => {
    setSubType(e.target.value);
  };

  return (
    <>
      <h1>BillingPage</h1>
      <StripeProvider apiKey="pk_test_6uEhds8mHz26DG95ZvUwTURp">
        <Elements>
          <CheckoutForm subType={subType} />
        </Elements>
      </StripeProvider>
      <form>
        <label>
          <input
            onChange={handleChange}
            type="radio"
            name="subType"
            value="yearly"
          />
          yearly
        </label>
        <label>
          <input
            onChange={handleChange}
            type="radio"
            name="subType"
            value="monthly"
          />
          monthly
        </label>
      </form>
    </>
  );
};

export default BillingPage;
