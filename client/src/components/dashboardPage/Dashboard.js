import React, { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { CardContent, Typography, Card, Icon, Button, Grid, withStyles } from '@material-ui/core';

// TODO update refreshrs EDIT button on card w/ correct link

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '60px',
  },
  containers: {
    display: 'flex',
    flexFlow: 'column nowrap',
    background: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '200px',
    height: '100px',
    margin: '0 5%',
    border: '1px solid red'
  },
  classContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
    ...theme.mixins.gutters(),
    alignItems: 'center',
    paddingBottom: theme.spacing.unit * 2,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '18rem'
    }
  },
  lists: {
    fontSize: '1rem'
  },
  links: {
    color: 'inherit',
    textDecoration: 'none'
  },
  classTitle: {
    background: '#9D69A3',
    color: '#FFFFFF',
    paddingLeft: '10px'
  },
  refreshrTitle: {
    background: '#488286',
    color: '#FFFFFF',
    paddingLeft: '10px'
  },
  cardSectionLabels: {
    marginLeft: '2rem',
    [theme.breakpoints.down('sm')]: {
      margin: '0'
    }
  },
  classCard: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1rem',
    background: 'white',
    width: '200px'
  },
  refreshrNewCard: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1rem',
    background: 'white',
    width: '200px',
    height: '130px'
  },
  buttonDiv: {
    justifyContent: 'space-around'
  },
  classData: {
    paddingLeft: '10px'
  },
  icon: {
    fontSize: '70px',
    margin: '2rem auto'
  },
  refreshrIcon: {
    fontSize: '70px',
    margin: '1rem auto'
  }
});

const Dashboard = props => {
  // const name = localStorage.getItem('name'); // commented out until decide what to do w/ name
  useEffect(() => {
    props.getClasses();
  }, []);
  const { allClasses, classes } = props;
  const testClasses = [
    {
      classname: 'FSW438',
      numOfStudents: 84,
      participationRate: 76,
      refreshrsEmailed: 67,
      class_id: 1
    },
    {
      classname: 'Android 74',
      numOfStudents: 84,
      participationRate: 78,
      refreshrsEmailed: 36,
      class_id: 2
    },
    {
      classname: 'Android 74',
      numOfStudents: 84,
      participationRate: 78,
      refreshrsEmailed: 36,
      class_id: 3
    },
    {
      classname: 'Android 74',
      numOfStudents: 84,
      participationRate: 78,
      refreshrsEmailed: 36,
      class_id: 4
    }
  ];
  const testRefreshrs = [
    {
      refreshrName: 'CSS Basics',
      classesAssigned: 84,
      refreshr_id: 1
    },
    {
      refreshrName: 'Relational Databases',
      classesAssigned: 21,
      refreshr_id: 2
    },
    {
      refreshrName: 'Relational Databases',
      classesAssigned: 21,
      refreshr_id: 3
    },
    {
      refreshrName: 'Relational Databases',
      classesAssigned: 21,
      refreshr_id: 4
    },
    {
      refreshrName: 'Relational Databases',
      classesAssigned: 21,
      refreshr_id: 5
    }
  ];
  return (
    <Grid className={classes.wrapper}>
      {console.log('PROPS', allClasses)}
      {/* cant figure out what to do w/ the username right now */}
      {/* <Typography component="h2" color="secondary">
        Welcome {name}, 
      </Typography> */}
      {/* end username */}
      <Typography
        component="h2"
        color="secondary"
        className={classes.cardSectionLabels}
      >
        Classes:
      </Typography>
      <Grid className={classes.classContainer}>
        {testClasses.map(c => (
          <Card key={c.class_id} className={classes.classCard}>
            <Typography component="h4" className={classes.classTitle}>
              {c.classname.length > 10
                ? c.classname.substring(0, 10) + '...'
                : c.classname}
            </Typography>
            <CardContent className={classes.classData}>
              <Typography component="p" className={classes.lists}>
                Students: {c.numOfStudents}
              </Typography>
              <Typography component="p" className={classes.lists}>
                Participation: {c.participationRate}%
              </Typography>
              <Typography component="p" className={classes.lists}>
                Refreshrs Sent: {c.refreshrsEmailed}
              </Typography>
            </CardContent>
            <Button color="primary" className={classes.lists}>
              <Link
                to={`/classes/edit/${c.class_id}`}
                className={classes.links}
              >
                Edit
              </Link>
            </Button>
          </Card>
        ))}
        <Card className={classes.classCard}>
          <Typography component="h4" className={classes.classTitle}>
            New Class
          </Typography>
          <Icon className={classes.icon} color="primary">
            <Link to="/classes/create" className={classes.links}>
              add_circle
            </Link>
          </Icon>
        </Card>
      </Grid>
      <Typography
        component="h2"
        color="secondary"
        className={classes.cardSectionLabels}
      >
        Refreshrs:
      </Typography>
      <Grid className={classes.classContainer}>
        {testRefreshrs.map(r => (
          <Card key={r.refreshr_id} className={classes.classCard}>
            <Typography component="h4" className={classes.refreshrTitle}>
              {r.refreshrName.length > 10
                ? r.refreshrName.substring(0, 10) + '...'
                : r.refreshrName}
            </Typography>
            <CardContent className={classes.classData}>
              <Typography component="p" className={classes.lists}>
                Classes Assigned: {r.classesAssigned}
              </Typography>
            </CardContent>
            <Button color="primary" className={classes.lists}>
              <Link to="/" className={classes.links}>
                Edit
              </Link>
            </Button>
          </Card>
        ))}
        <Card className={classes.refreshrNewCard}>
          <Typography component="h4" className={classes.refreshrTitle}>
            New Refreshr
          </Typography>
          <Icon className={classes.refreshrIcon} color="primary">
            <Link to="/refreshrs/create" className={classes.links}>
              add_circle
            </Link>
          </Icon>
        </Card>
      </Grid>
    </Grid>
  );
};
export default withRouter(withStyles(styles)(Dashboard));
