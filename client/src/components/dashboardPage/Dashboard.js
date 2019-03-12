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
      width: 500
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

const Dashboard = props => {
  // const name = localStorage.getItem('name'); // commented out until decide what to do w/ name
  const { userClasses, classes, userRefreshrs, getClasses, getRefreshrs } = props;

  useEffect(() => {
    getClasses();
    getRefreshrs();
  }, []);

  
  return (
    <Grid className={classes.wrapper}>
      <Typography
        component="h2"
        color="secondary"
        className={classes.cardSectionLabels}
      >
        Classes:
      </Typography>

      <Grid className={classes.classContainer}>
        {userClasses.map(c => (
          <Link key={c.class_id} to={`classes/edit/${c.class_id}`} style={{textDecoration: 'none'}}>
          <Card className={classes.classCard}>
            <Typography component="h4" className={classes.classTitle}>
              {c.classname.length > 10
                ? c.classname.substring(0, 10) + '...'
                : c.classname}
            </Typography>
            <CardContent className={classes.classData}>
              {/* Need analytics for these, stretch goals? */}

              <Typography component="p" className={classes.lists}>
                Students: {c.numOfStudents}
              </Typography>
              <Typography component="p" className={classes.lists}>
                Participation: {c.participationRate}
              </Typography>
              <Typography component="p" className={classes.lists}>
                Refreshrs Sent: {c.refreshrsEmailed}
              </Typography>
            </CardContent>
          </Card></Link>
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
      <hr className={props.classes.hrStyle} />
      <Typography
        component="h2"
        color="secondary"
        className={classes.cardSectionLabels}
      >
        Refreshrs:
      </Typography>
      <Grid className={classes.classContainer}>
        {console.log('USER REF *_*', userRefreshrs)}
        {userRefreshrs.map(r => (
          <Link key={r.refreshr_id} to={`refreshrs/edit/${r.refreshr_id}`} style={{textDecoration: 'none'}}>
          <Card className={classes.classCard}>
            {/* {console.log('R ===', r)} */}
              <Typography component="h4" className={classes.refreshrTitle}>
                {/* {r.refreshrName.length > 10
                  ? r.refreshrName.substring(0, 10) + '...'
                  : r.refreshrName} */}
              </Typography>
              <CardContent className={classes.classData}>
                <Typography component="p" className={classes.lists}>
                  Classes Assigned: {r.classesAssigned}
                </Typography>
              </CardContent>
          </Card>
          </Link>
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
}
export default withRouter(withStyles(styles)(Dashboard));


// console.log('Refreshr from Dash ===', userRefreshrs);
  // console.log('teacher refreshr => ', teacherRefreshrs.data);
  // const testClasses = [
  //   {
  //     classname: 'FSW438',
  //     numOfStudents: 84,
  //     participationRate: 76,
  //     refreshrsEmailed: 67,
  //     class_id: 1
  //   },
  //   {
  //     classname: 'Android 74',
  //     numOfStudents: 84,
  //     participationRate: 78,
  //     refreshrsEmailed: 36,
  //     class_id: 2
  //   },
  //   {
  //     classname: 'Android 74',
  //     numOfStudents: 84,
  //     participationRate: 78,
  //     refreshrsEmailed: 36,
  //     class_id: 3
  //   },
  //   {
  //     classname: 'Android 74',
  //     numOfStudents: 84,
  //     participationRate: 78,
  //     refreshrsEmailed: 36,
  //     class_id: 4
  //   }
  // ];
  // const testRefreshrs = [
  //   {
  //     refreshrName: 'CSS Basics',
  //     classesAssigned: 84,
  //     refreshr_id: 1
  //   },
  //   {
  //     refreshrName: 'Relational Databases',
  //     classesAssigned: 21,
  //     refreshr_id: 2
  //   },
  //   {
  //     refreshrName: 'Relational Databases',
  //     classesAssigned: 21,
  //     refreshr_id: 3
  //   },
  //   {
  //     refreshrName: 'Relational Databases',
  //     classesAssigned: 21,
  //     refreshr_id: 4
  //   },
  //   {
  //     refreshrName: 'Relational Databases',
  //     classesAssigned: 21,
  //     refreshr_id: 5
  //   }
  // ];
  // const redirect = url => {
  //   console.log('Props from redirect', props);
  //   props.history.push(url);
  // };

     /* {console.log('PROPS', userClasses, userRefreshrs)}
      {console.log(
        'userRefreshrs ==>',
        userRefreshrs.map(data => data.typeform_url)
      )} 
      cant figure out what to do w/ the username right now
      <Typography component="h2" color="secondary">
        Welcome {name}, 
      </Typography> 
       end username */