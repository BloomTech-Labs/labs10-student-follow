import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Card,
  Checkbox,
  Button,
  FormGroup,
  Fab,
  ExpansionPanel,
  ExpansionPanelSummary,
  TextField
} from '@material-ui/core';
import {
  GroupAdd,
  ExpandMore,
  Create,
  Backspace,
  RemoveCircleOutline
} from '@material-ui/icons';

const styles = theme => ({
  studentList: {
    display: 'flex',
    flexFlow: 'column wrap',
    border: `1px solid ${theme.palette.secondary.main}`,
    flexWrap: 'wrap',
    width: '45%',
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
  },
  hiddenButton: {
    display: 'none'
  },
  expansionPanel: {
    marginTop: theme.spacing.unit * 3,
    borderRadius: '5px',
    border: `1px solid ${theme.palette.secondary.main}`
  },
  editName: {
    display: 'flex',
    flexDirection: 'column'
  },
  studentName: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.unit * 2,
    alignItems: 'center'
  },
  studentIcons: {
    display: 'inline',
    alignSelf: 'flex-end'
  }
});

function students(props) {
  const { classes } = props;

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

  function editStudent(id) {
    console.log(id);
    const [student] = props.students.filter(s => s.student_id === id);
    student.isEditing = true;
    console.log(student);
  }
  // <Checkbox
  //   color="secondary"
  //   value={`${s.student_id}`}
  //   checked={props.selectedStudents.includes(s.student_id)}
  //   onClick={e => selectStudent(e)}
  // />

  function handleChange(e, student) {
    console.log(e.target.value);
    console.log(student);
    console.log(e.target.name);
    student[e.target.name] = e.target.value;
  }

  return (
    <>
      <Typography variant="h6" className={classes.title} gutterBottom>
        Current Students
      </Typography>
      <Card className={classes.studentList}>
        {props.students.map(s => (
          <Grid
            key={s.student_id}
            className={s.isActiveStudent ? null : classes.studentName}
          >
            <span>{`${s.first_name} ${s.last_name} `}</span>
            <Grid className={classes.studentIcons}>
              {s.isActiveStudent ? (
                <Backspace onClick={e => props.toggleEditStudent(s)} />
              ) : (
                <Create onClick={e => props.toggleEditStudent(s)} />
              )}
              <RemoveCircleOutline
                onClick={() => props.dropStudent(s.student_id)}
              />
            </Grid>
            {s.isActiveStudent && (
              <form
                className={classes.editName}
                onSubmit={e => props.submitUpdatedStudent(e)}
              >
                {props.makeInput(
                  'email',
                  'Email',
                  props.activeStudent.email,
                  e => {
                    props.updateStudent(e, s);
                  }
                )}
                {props.makeInput(
                  'first_name',
                  'First Name',
                  props.activeStudent.first_name,
                  e => {
                    props.updateStudent(e, s);
                  }
                )}
                {props.makeInput(
                  'last_name',
                  'Last Name',
                  props.activeStudent.last_name,
                  e => {
                    props.updateStudent(e, s);
                  }
                )}
                <button className={classes.hiddenButton} />
              </form>
            )}
          </Grid>
        ))}
      </Card>
      <ExpansionPanel className={classes.expansionPanel}>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography variant="body1" gutterBottom>
            Add a Student
          </Typography>
        </ExpansionPanelSummary>
        <form
          className={classes.settingsBox}
          onSubmit={e => props.addStudent(e)}
        >
          {props.makeInput('email', 'Email', undefined, undefined, 'email')}
          {props.makeInput('first_name', 'First Name')}
          {props.makeInput('last_name', 'Last Name')}
          <Fab
            elevation={20}
            aria-label="Add"
            className={classes.btn}
            onClick={e => props.addStudent(e)}
          >
            <button type="submit" className={classes.hiddenButton} />
            <GroupAdd />
          </Fab>
        </form>
      </ExpansionPanel>
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
