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
    border: '1px solid #777',
    width: '30%',
    height: '50vh',
    position: 'relative',
    justifyContent: 'space-between',
    padding: '5%'
  }
});

const BillingPage = props => {
  const [subType, setSubType] = useState('');

  const handleChange = e => {
    setSubType(e.target.value);
  };

  return (
    <>
      <h1>BillingPage</h1>
      <Grid className={props.classes.cardWrapper}>
        <Grid>
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
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(BillingPage);
