import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, Typography, Icon, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// import { NewClassCard, ExistingClassCard } from '../index.js';
import axios from 'axios';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    height: '90vh',
    margin: '0 1rem',
    flexWrap: 'wrap',
    border: '1px solid black'
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

function ClassListView(props) {
  const { classes } = props;
  const [classList, setClassList] = useState([]);

  const ax = axios.create({
    // baseURL: 'https://refreshr.herokuapp.com' // production
    baseURL: 'http://localhost:9000' // development
  });

  // fetch classes on mount
  useEffect(() => {
    // this should be the teacher(user) id, using a teacher with two classes for now
    // change to 1 or something to see the empty list
    getTeacherClasses(35);
  }, []);

  useEffect(() => {
    console.log(classList);
  }, [classList]);

  async function getTeacherClasses(id) {
    try {
      const res = await ax.get(`/classes/teachers/${id}`);
      setClassList(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  if (!classList.length) {
    return (
      <Grid className={classes.emptyList}>
        <Typography variant="h2">Add a New Class</Typography>
        <Link to="classes/create">
          <Icon color="action" style={{ fontSize: 60 }}>
            add_circle
          </Icon>
        </Link>
      </Grid>
    );
  } else {
    return (
      <Grid className={props.classes.wrapper}>
        {classList.map(c => (
          <Card key={c.id} className={classes.card} raised>
            <CardContent>
              <Typography className={classes.title}>{c.name}</Typography>
            </CardContent>
          </Card>
        ))}
        <Link to="/classes/create" style={{ textDecoration: 'none' }}>
          <Card className={classes.card} raised>
            <CardContent>
              <Typography className={classes.title}>New Class</Typography>
              <Icon
                className={classes.icon}
                color="action"
                style={{ fontSize: 60 }}
              >
                add_circle
              </Icon>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    );
  }
}

export default withStyles(styles)(ClassListView);
