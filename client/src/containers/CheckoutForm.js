import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const url = 'http://localhost:9000/billing/charge';

const style = theme => ({
  card: {
    flexGrow: 1,
    direction: 'column'
  },
  coButton: {
    margin: '10px 0'
  }
});

const CheckoutForm = props => {
  const handleSubmit = async e => {
    const { token } = await props.stripe.createToken({ name: 'Name' });
    if (props.subType) {
      axios
        .post(url, { token: token.id, subType: props.subType })
        .then(res => {
          if (res.status === 200) {
            console.log('response', res.status);
            console.log('purchase complete!');
          } else {
            console.log('purchase failed');
          }
        })
        .catch(err => console.log());
    }
  };

  return (
    <>
      <Grid className={props.classes.card}>
        <CardElement />
      </Grid>
      <Grid className={props.classes.coButton}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Buy Now
        </Button>
      </Grid>
    </>
  );
};

export default injectStripe(withStyles(style)(CheckoutForm));
