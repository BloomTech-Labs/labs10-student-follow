import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
  progress: {
    position: 'absolute',
    left: '45%',
    top: '40%'
  }
});

const Loading = (props) => {
  const { classes } = props;
  return (
    <CircularProgress size={100} className={classes.progress} />
  );
};

export default withStyles(styles)(Loading);
