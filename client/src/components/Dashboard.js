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
        width: `100% - ${200}px`,
        marginRight: 200
      },
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
  lists: {
    fontSize: '30px'
  },
});

const Dashboard = props => {
  const name =  localStorage.getItem('name')

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
  return (
    <Grid className={classes.wrapper}>
              <h1 style={{color:'white'}}>User: {name}</h1>

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
      <div className={classes.containers}>
        <h5>Classes</h5>
        {allClasses.map(c => (
          <p key={c.class_id} className={classes.lists}>{c.classname}</p>
        ))}
      </div>
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
