import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import Button from '@material-ui/core/Button';

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
      <Button variant="contained" color="primary" onClick={handleSubmit}>Buy Now</Button>
  </>
  );
};

export default injectStripe(CheckoutForm);
