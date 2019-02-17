import React, { useState } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  cardWrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',

  },
  cardBox: {
    border: '1px solid black',
    transform: 'translateY(-50%) translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyConent: 'space-between',
    position: 'absolute',
    top: '40%',
    left: '50%',
    width: '50%',
    height: '20%',
  },
});

const BillingPage = props => {
  const [subType, setSubType] = useState('');

  const handleChange = e => {
    setSubType(e.target.value);
  };

  return (
    <>
      <Grid className={props.classes.cardWrapper}>
        <h1>BillingPage</h1>
        <div className={props.classes.cardBox}>
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
        </div>
      </Grid>
    </>
  );
};

export default withStyles(styles)(BillingPage);
