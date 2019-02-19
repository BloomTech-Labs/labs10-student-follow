import React, { useState } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '../components/Snackbar';

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
  const [snackbar, setSnackbar] = useState(false);

  const openSnackbar = () => {
    setSnackbar(true);
    setTimeout(() => {
      setSnackbar(false);
    }, 1000);
  };

  const handleChange = e => {
    setSubType(e.target.value);
  };

  return (
    <>
      <h1>BillingPage</h1>
      <Button variant="contained" onClick={openSnackbar}>
        Test Snackbar
      </Button>
      {snackbar && <Snackbar message="testing snackbar" />}
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
              1 Year Subscription - $9.99
            </label>
            <label>
              <input
                onChange={handleChange}
                type="radio"
                name="subType"
                value="monthly"
              />
              1 Year Premium Subscription - $29.99
            </label>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(BillingPage);
