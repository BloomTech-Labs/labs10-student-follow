import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '90vh',
    margin: '0 1rem'
  },
  containers: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '200px',
    height: '100px',
    margin: '0 5%',
    border: '1px solid red'
  },
  lists: {
    fontSize: '6px'
  }
});

const MiscData = props => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('TOKEN:', token);
    //dtaRnjvXFK65as2iOgVhLwuIaOUYqrOu
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    props.getTeachers(options);
    props.getStudents(options);
    props.getClasses(options);
    props.getQuestions(options);
  }, []);
  const { teachers, students, allClasses, questions, classes } = props;
  //   console.log('Teachers Check:', teachers)
  //   console.log('Students Check:', students)
  //   console.log('Classes Check:', classes)
  //   console.log('Questions Check:', questions)
  return (
    <Grid className={classes.wrapper}>
      <div className={classes.containers}>
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
      </div>
      <div className={classes.containers}>
        <h5>Classes</h5>
        {allClasses.map(c => (
          <p className={classes.lists}>{c.name}</p>
        ))}
      </div>
      <div className={classes.containers}>
        <h5>Questions</h5>
        {questions.map(question => (
          <p className={classes.lists}>{question.question}</p>
        ))}
      </div>
    </Grid>
  );
};
export default withRouter(withStyles(styles)(MiscData));
