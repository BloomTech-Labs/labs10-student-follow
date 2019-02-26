import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
/* STYLES */
const styles = theme => ({
  wrapper: {
    border: '1px solid black',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1rem',
    width: '30%',
    height: '30%'
  }
});

const RefreshrCard = props => {
  const { classes, refreshrs} = props;
  //console.log('refreshrs', refreshrs);
  // console.log('props', props);
 return refreshrs.map(refreshr => (
      <Grid className={classes.wrapper} key={refreshr.id}>
        <h1>{refreshr.date}</h1>
        <div>{refreshr.class_id}</div>
      </Grid>
  ));
};
export default withStyles(styles)(RefreshrCard);
