import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Logo from '../../LogoSmall.png';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
// import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
// import classNames from 'classnames';
const styles = theme => ({
  button: {
    background: theme.palette.secondary.main,
    color: theme.palette.primary.dark,
    padding: '1%',
    display: 'flex',
    flexFlow: 'row nowrap',
    fontSize: '1.2rem',
    width: '100%',
    marginBottom: '5%',
    '&:hover': {
      background: theme.palette.secondary.dark,
    }
  }
});

const TakeMoney = props => {
  const { classes } = props;

  const onToken = async token => {
    const url = 'http://localhost:9000/billing/charge';
    try {
      await axios.post(url, {
        token: token,
        subType: this.props.subType
      });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const sendEmail = event => {
    // this is a temporary solution. We should create a custom form rather than opening the email client
    event.preventDefault();
    window.location.href = `mailto:hello@refreshr.com`;
  };

  return props.variant === 'custom' ? (
    <>
      <Button onClick={sendEmail} className={classes.button}>
        Contact Us
      </Button>
    </>
  ) : (
    <div style={{width: '100%'}}>
      <StripeCheckout // This component uses the token created above to make a one time payment
        token={onToken}
        ComponentClass='div'
        stripeKey="pk_test_Y6iNnz4ImmbwJDcFA982Hahf"
        name="Refreshr"
        description="Purchase your subscription"
        panelLabel="Purchase"
        image={Logo} // We should have a second smaller logo image without text
        amount={props.variant} // Amount passed by buttonVariant in Pricing.js
        currency="USD"
        email={localStorage.getItem('email')}> 
        <Button className={classes.button}>Pay with Card</Button>
      </StripeCheckout>
     </div> 
  );
};

export default withStyles(styles, { withTheme: true })(TakeMoney);
