import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Logo from '../../LogoSmall.png';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  withStyles
} from '@material-ui/core';
import axios from 'axios';

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
      background: theme.palette.secondary.dark
    }
  },
  modalTitle: {
    background: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.secondary.main}`,
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    margin: '0'
  },
  modalContent: {
    background: theme.palette.primary.dark,
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center'
  },
  modalContentText: {
    color: theme.palette.secondary.main,
    margin: '10px 0'
  },
  textField: {
    background: theme.palette.secondary.main,
    borderRadius: '4px',
    padding: '1rem'
  },
  modalFooter: {
    background: theme.palette.secondary.main,
    margin: '0'
  }
});

const TakeMoney = props => {
  const { classes } = props;
  const [open, setOpen] = useState(false);

  const onToken = async token => {
    const url = 'https://refreshr.herokuapp.com/billing/charge';
    try {
      await axios.post(url, {
        token: token,
        subType: this.props.subType
      });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return props.variant === 'custom' ? (
    <>
      <Button onClick={handleToggle} className={classes.button}>
        Contact Us
      </Button>
      <Dialog
        open={open}
        onClose={handleToggle}
        aria-labelledby="form-dialog-title"
      >
        <form
          name="Contact Us Form"
          method="POST"
          action="/"
          data-netlify="true"
        >
          <DialogTitle id="form-dialog-title" className={classes.modalTitle}>
            Contact Us
          </DialogTitle>
          <DialogContent className={classes.modalContent}>
            <DialogContentText className={classes.modalContentText}>
              To learn more about our custom options please leave us your email
              and we'll get back to you as soon as possible.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              name="email"
              fullWidth
              className={classes.textField}
            />
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button onClick={handleToggle} color="primary">
              Cancel
            </Button>
            <Button onClick={handleToggle} color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  ) : (
    <div style={{ width: '100%' }}>
      <StripeCheckout // This component uses the token created above to make a one time payment
        token={onToken}
        ComponentClass="div"
        stripeKey="pk_test_Y6iNnz4ImmbwJDcFA982Hahf"
        name="Refreshr"
        description="Purchase your subscription"
        panelLabel="Purchase"
        image={Logo} // We should have a second smaller logo image without text
        amount={props.variant} // Amount passed by buttonVariant in Pricing.js
        currency="USD"
        email={localStorage.getItem('email')}
      >
        <Button className={classes.button}>Pay with Card</Button>
      </StripeCheckout>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(TakeMoney);
