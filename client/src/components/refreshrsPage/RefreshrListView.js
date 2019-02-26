import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import RefreshrCard from './RefreshrCard';
/* STYLES */
const styles = theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    margin: '0 5rem'
  }
});

const RefreshrListView = props => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('TOKEN:', token)
    //dtaRnjvXFK65as2iOgVhLwuIaOUYqrOu
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    props.getRefreshrs(options)

  }, [])

  const { classes, refreshrs } = props

  // console.log('r', refreshrs)


  return (
    //console.log(refreshrs),
    <Grid className={classes.wrapper}>
      <RefreshrCard refreshrs={refreshrs} />
    </Grid>
  );
};
export default withRouter(withStyles(styles)(RefreshrListView));
