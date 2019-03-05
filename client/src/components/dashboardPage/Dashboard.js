import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

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
    fontSize: '30px'
  },
  classCard: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1rem',
    background: 'white',
    padding: '.5rem',
    border: '3px solid red',
    width: '200px'
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
  const { teachers, students, allClasses, questions, classes } = props;
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
      <h1 style={{ color: 'white' }}>User: {name}</h1>

      {/* <div className={classes.containers}>
        <h5>Students</h5>
        {students.map(student => (
          <p className={classes.lists}>{student.email}</p>
        ))}{' '}
      </div>

      <div className={classes.containers}>
        <h5>Teachers</h5>
        {teachers.map(teacher => (
          <p className={classes.lists}>{teacher.email}</p>
        ))}
      </div> */}

      {console.log('PROPS', allClasses)}
      <div className={classes.classContainer}>
        {testClasses.map(c => (
          <div key={c.class_id} className={classes.classCard}>
            <h4>{c.classname}</h4>
            <p style={{ margin: 0 }}>Students: {c.numOfStudents}</p>
            <p style={{ margin: 0 }}>Participation: {c.participationRate}%</p>
            <p>Refreshrs Sent: {c.refreshrsEmailed}</p>
          </div>
        ))}
      </div>

      {/* START this is the working card when you got here */}
      {/* <div className={classes.containers}>
        <h5>Classes</h5>
        {testClasses.map(c => (
          <p key={c.class_id} className={classes.lists}>
            {c.classname}
          </p>
        ))}
      </div> */}
      {/* END this is the working card when you got here */}

      {/* <div className={classes.containers}>
        <h5>Questions</h5>
        {questions.map(question => (
          <p className={classes.lists}>{question.question}</p>
        ))}
      </div> */}
    </Grid>
  );
};
export default withRouter(withStyles(styles)(Dashboard));
