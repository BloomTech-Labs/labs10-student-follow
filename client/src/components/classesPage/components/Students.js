import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Card,
  Checkbox,
  Button,
  FormGroup,
  Fab
} from '@material-ui/core';
import { GroupAdd } from '@material-ui/icons';

const styles = theme => ({
  studentList: {
    display: 'flex',
    flexFlow: 'column wrap',
    border: `1px solid ${theme.palette.secondary.main}`,
    flexWrap: 'wrap',
    [theme.breakpoints.only('xs')]: {
      width: '70%'
    },
    maxHeight: theme.spacing.unit * 50,
    padding: theme.spacing.unit * 2
  },
  settingsBox: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '5%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    //border: '1px solid purple',
    margin: theme.spacing.unit * 2
  },
  title: {
    color: `${theme.palette.primary.contrastText}`,
    textAlign: 'center'
  },
  btn: {
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.primary.main,
    background: theme.palette.secondary.main,
    width: 40,
    height: 40
  }
});

function students(props) {
  const { classes } = props;
  const [addedStudents, setAddedStudents] = useState([]);

  function selectStudent(e) {
    const studentId = e.target.value;
    let updatedStudents = props.selectedStudents;
    if (e.target.checked) {
      updatedStudents = props.selectedStudents.concat(studentId);
    } else {
      updatedStudents = props.selectedStudents.filter(s => s !== studentId);
    }
    props.setSelectedStudents(updatedStudents);
  }

  return (
    <>
      <Typography variant="h6" className={classes.title} gutterBottom>
        Current Students
      </Typography>
      <Card className={classes.studentList}>
        {props.students.map((s, i) => (
          <Grid key={i}>
            <span>{`${s.name}`}</span>
            <Checkbox
              color="secondary"
              value={`${s.student_id}`}
              checked={props.selectedStudents.includes(s.student_id)}
              onClick={e => selectStudent(e)}
            />
          </Grid>
        ))}
        {addedStudents.map((s, i) => (
          <Grid key={i}>
            <span style={{ fontWeight: 'bold' }}>{`${s.first_name} ${
              s.last_name
            }`}</span>
            <Checkbox
              color="primary"
              value={`${s.student_id}`}
              checked={props.selectedStudents.includes(s.student_id)}
              onClick={e => selectStudent(e)}
            />
          </Grid>
        ))}
      </Card>
      <FormGroup className={classes.settingsBox}>
        <Typography variant="body1" gutterBottom>
          Add a Student
        </Typography>
        {props.makeInput('email', 'Email')}
        {props.makeInput('first_name', 'First Name')}
        {props.makeInput('last_name', 'Last Name')}
        <Fab
          elevation={20}
          aria-label="Add"
          className={classes.btn}
          onClick={e => props.addStudent(e)}
        >
          <GroupAdd />
        </Fab>
      </FormGroup>
      <Grid className={classes.buttonBox}>
        {props.selectedStudents.length ? (
          <Button variant="outlined" onClick={props.dropStudents}>
            Remove selected from class
          </Button>
        ) : null}
      </Grid>
    </>
  );
}

export default withStyles(styles, { withTheme: true })(students);
