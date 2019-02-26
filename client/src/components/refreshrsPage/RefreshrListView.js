import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import RefreshrCard from './RefreshrCard';

/* STYLES */
const styles = theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    margin: '0 5rem',
    flexWrap: 'wrap'
  }
});

const ax = axios.create({
  baseURL: 'https://refreshr.herokuapp.com'
});

const RefreshrListView = props => {
  const [refreshrs, setRefreshrs] = useState([]);
  useEffect(() => {
    // const token = localStorage.getItem('token');
    // console.log('TOKEN:', token);
    //dtaRnjvXFK65as2iOgVhLwuIaOUYqrOu
    // const options = {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // };
    // props.getRefreshrs(options);
    getTeacherRefreshrs(239);
  }, []);

  useEffect(() => {
    console.log(refreshrs);
  });

  // after we add auth0 management, this would take the id of the logged-in teacher
  async function getTeacherRefreshrs(id) {
    const res = await ax.get(`/refreshrs/teachers/${id}`);
    setRefreshrs(res.data);
  }
  const { classes } = props;

  // console.log('r', refreshrs)

  // <RefreshrCard refreshrs={refreshrs} />
  return (
    //console.log(refreshrs),
    <Grid className={classes.wrapper}>
      {refreshrs.map(r => (
        <Card key={r.id} raised>
          <Typography variant="h1">{r.name}</Typography>
        </Card>
      ))}
    </Grid>
  );
};
export default withRouter(withStyles(styles)(RefreshrListView));
