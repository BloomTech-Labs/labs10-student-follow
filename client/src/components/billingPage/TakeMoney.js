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
    margin: '0',
  },
  modalContent: {
    background: theme.palette.primary.dark,
    // border: `1px solid ${theme.palette.secondary.main}`,
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
  },
  modalContentText: {
    color: theme.palette.secondary.main,
    margin: '10px 0'
  },
  textField: {
    background: theme.palette.secondary.main,
    borderRadius: '4px',
    padding: '1rem'
  }
});

const TakeMoney = props => {
  const { classes } = props;
  const [open, setOpen] = useState(false);

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

  // form dialog start
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return props.variant === 'custom' ? (
    <>
      <Button onClick={handleClickOpen} className={classes.button}>
        Contact Us
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.modalTitle}>Contact Us</DialogTitle>
        {/* <DialogContent>
          <DialogContentText> */}
        <DialogContent className={classes.modalContent}>
          <DialogContentText className={classes.modalContentText}>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            className={classes.textField}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="secondary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : (
    <div style={{ width: '100%' }}>
      <StripeCheckout // This component uses the token created above to make a one time payment
        token={onToken}
        ComponentClass="div"
        stripeKey="pk_test_Y6iNnz4ImmbwJDcFA982Hahf"
        className={classes.button}
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
