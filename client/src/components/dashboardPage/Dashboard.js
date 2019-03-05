import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { CardContent, Typography, Card, Icon, CardMedia, CardActionArea } from '@material-ui/core';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 100,
    //NEEDED TO CENTER VIEWS:
    [theme.breakpoints.up('sm')]: {
      width: `100% - ${200}px`
      // marginRight: 200 // temp removed because of the comments above,
    }
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
    width: '600px',
    border: '3px solid teal',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '18rem'
    }
  },
  lists: {
    fontSize: '1rem',
  },
  classTitle: {
    background: '#9D69A3',
    color: '#FFFFFF',
    paddingLeft: '10px'
  },
  classData: {

    paddingLeft: '10px'
  },
  classCard: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1rem',
    background: 'white',
    // border: '3px solid red',
    width: '200px',
  }
});

const Dashboard = props => {
  const name = localStorage.getItem('name');

  useEffect(() => {
    // props.getTeachers(options);
    // props.getStudents(options);
    props.getClasses();
    // props.getQuestions(options);
  }, []);
  const { allClasses, classes } = props;
  //   console.log('Teachers Check:', teachers)
  //   console.log('Students Check:', students)
  //   console.log('Classes Check:', classes)
  //   console.log('Questions Check:', questions)
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
    }
  ];
  return (
    <Grid className={classes.wrapper}>
      <Typography component="h2" color='secondary' inline="true">User: {name}</Typography>
      {console.log('PROPS', allClasses)}
      <Grid className={classes.classContainer}>
        {testClasses.map(c => (
          <Card key={c.class_id} className={classes.classCard}>
          {/* <CardActionArea> */}

            {/* <CardMedia component="img" image={require("./logo.png")} title="refreshr logo" alt="refreshr logo" height="auto" width="20"/> */}
            <Typography component='h4' className={classes.classTitle}>{c.classname}</Typography>
            <CardContent className={classes.classData}>

            <Typography component="p"   className={classes.lists}>Students: {c.numOfStudents}</Typography>
            <Typography component="p"   className={classes.lists}>Participation: {c.participationRate}%</Typography>
            <Typography component="p"  className={classes.lists}>Refreshrs Sent: {c.refreshrsEmailed}</Typography>
            </CardContent>
          {/* </CardActionArea> */}
          </Card>
        ))}
        <div className={classes.classCard}>
          <h4>New Class</h4>
          <Icon className={classes.icon} fontSize="large">
            add_circle
          </Icon>
        </div>
      </Grid>
    </Grid>
  );
};
export default withRouter(withStyles(styles)(Dashboard));
