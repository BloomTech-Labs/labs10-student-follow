import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: red[600]
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
});

const MySnackbar = props => {
  const { className, message } = props;
  const [isOpen, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      className={props.className}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      open={isOpen}
      autoHideDuration={1500}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={<span>{message}</span>}
      action={[
        <Button key="undo" color="secondary" size="small" onClick={handleClose}>
          CLOSE
        </Button>,

        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
};

export default withStyles(styles)(MySnackbar);
