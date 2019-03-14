import React, { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

import {
  Typography,
  Card,
  Grid,
  withStyles,
  Paper
} from '@material-ui/core';
//import axios from 'axios';

const styles = theme => ({
  container: {
    [theme.breakpoints.up('md')]: {
      width: '80vw',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-around'
    }
  },
  sectionWrapper: {
    border: `1px solid ${theme.palette.secondary.main}`,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 8,
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 4,
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.dark,
    [theme.breakpoints.only('sm')]: {
      width: '60vw'
    },
    [theme.breakpoints.only('xs')]: {
      width: '90vw'
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '2.5%',
      marginRight: '2.5%',
      padding: '2.5%',
      width: 800
    }
  },
  classContainer: {
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    padding: '1%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      padding: 5
    }
  },
  links: {
    color: 'inherit',
    textDecoration: 'none'
  },
  cardSectionLabels: {
    margin: 0,
    padding: 0
  },
  classCard: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1rem',
    background: 'white',
    width: '200px',
    textDecoration: 'none',
    color: theme.palette.secondary.contrastText
  },
  cardTitle: {
    color: theme.palette.secondary.contrastText,
    textAlign: 'center',
    fontSize: '1rem'
  },
  card: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5% 0',
    background: theme.palette.secondary.main,
    width: 125,
    height: 125,
    color: theme.palette.secondary.contrastText,
    [theme.breakpoints.down('sm')]: {
      margin: '10% 0'
    },
    '&:hover': {
      background: theme.palette.secondary.dark
    }
  },
});

const RefreshrListView = props => {
  // const name = localStorage.getItem('name'); // commented out until decide what to do w/ name
  const {
    classes,
    userRefreshrs,
    getRefreshrs
  } = props;

  useEffect(() => {
    getRefreshrs();
  }, []);

  return (
    <div className={classes.container}>
     
      <Paper className={classes.sectionWrapper} elevation={24}>
        <Typography
          variant="h6"
          color="secondary"
          className={classes.cardSectionLabels}
        >
          Current Refreshrs
        </Typography>
        <Grid className={classes.classContainer}>
          {userRefreshrs && userRefreshrs.map(r => {
            //console.log(r)
            //let participationRate = 0
            return (
              <Link
                key={r.refreshr_id}
                to={`refreshrs/edit/${r.refreshr_id}`}
                style={{ textDecoration: 'none' }}
              >
                <Card className={classes.card}>
                  {/* {console.log('R ===', r)} */}
                  <Typography className={classes.cardTitle}>
                    {r.name}
                  </Typography>
                </Card>
              </Link>
            );
          })}
        </Grid>
      </Paper>
    </div>
  );
};
export default withRouter(withStyles(styles)(RefreshrListView));
