import React, { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Typography, Card, Grid, withStyles, Paper } from '@material-ui/core';

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
  }
});

const ClasslistView = props => {
  const { userClasses, classes, getClasses, } = props;

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <div className={classes.container}>
      <Paper className={classes.sectionWrapper} elevation={24}>
        <Typography
          variant="h6"
          color="secondary"
          className={classes.cardSectionLabels}
        >
          Current Classes
        </Typography>
        <Grid className={classes.classContainer}>
          {userClasses &&
            userClasses.map(c => {
              return (
                //console.log(stats),
                <Link
                  key={c.class_id}
                  to={`classes/edit/${c.class_id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Card className={classes.card}>
                    <Typography className={classes.cardTitle}>
                      {c.classname}
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

export default withRouter(withStyles(styles)(ClasslistView));
