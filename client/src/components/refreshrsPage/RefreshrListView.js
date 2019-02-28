import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography, Icon, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import RefreshrCard from './RefreshrCard';

/* STYLES */
const styles = theme => ({
  wrapper: {
    display: 'flex',
    height: '90vh',
    margin: '0 5rem',
    flexWrap: 'wrap',
    border: '1px solid red'
  },
  card: {
    margin: 20,
    width: 200,
    height: 200,
    padding: theme.spacing.unit * 3,
    display: 'flex',
    border: '1px solid blue',
    position: 'relative'
  },
  icon: {
    margin: '0 auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -40%)'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  emptyList: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

const ax = axios.create({
  baseURL: 'https://refreshr.herokuapp.com'
});

const RefreshrListView = props => {
  const [refreshrs, setRefreshrs] = useState([]);
  useEffect(() => {
    /*** Commenting code below out instead of deleting bc I didn't write it -jl ***/

    // const token = localStorage.getItem('token');
    // console.log('TOKEN:', token);
    //dtaRnjvXFK65as2iOgVhLwuIaOUYqrOu
    // const options = {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // };
    // props.getRefreshrs(options);

    // 133 will display two refreshrs, 1 will display empty list
    getTeacherRefreshrs(133);
  }, []);

  // just for logging, can be deleted
  useEffect(() => {
    console.log(refreshrs);
  }, [refreshrs]);

  // after we add auth0 management, this would take the id of the logged-in teacher. for now it's just a random teacher with two refreshrs
  async function getTeacherRefreshrs(id) {
    const res = await ax.get(`/refreshrs/teachers/${id}`);
    setRefreshrs(res.data);
  }

  const { classes } = props;

  // <RefreshrCard refreshrs={refreshrs} />
  if (!refreshrs.length) {
    return (
      <Grid className={classes.emptyList}>
        <Typography variant="h2">Add a New Refreshr</Typography>
        <Icon color="action" style={{ fontSize: 60 }}>
          add_circle
        </Icon>
      </Grid>
    );
  } else {
    return (
      <Grid className={classes.wrapper}>
        {refreshrs.map(r => (
          <Card key={r.id} className={classes.card} raised>
            <CardContent>
              <Typography className={classes.title}>{r.name}</Typography>
              <Typography variant="body1">{r.review_text}</Typography>
            </CardContent>
          </Card>
        ))}
        <Card className={classes.card} raised>
          <CardContent>
            <Typography className={classes.title}>New Refreshr</Typography>
            <Icon
              className={classes.icon}
              color="action"
              style={{ fontSize: 60 }}
            >
              add_circle
            </Icon>
          </CardContent>
        </Card>
      </Grid>
    );
  }
};

export default withStyles(styles)(RefreshrListView);
