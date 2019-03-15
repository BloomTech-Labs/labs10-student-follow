import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Card,
  Button,
  Fab,
  ExpansionPanel,
  ExpansionPanelSummary
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
    width: '50%',
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
    border: `1px solid ${theme.palette.secondary.main}`,
    width: '50%'
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
            type="submit"
            onClick={e => props.addStudent(e)}
          >
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
