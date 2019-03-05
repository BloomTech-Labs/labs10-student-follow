import React, { useState, useEffect } from 'react';
import {
  Grid,
  Checkbox,
  Card,
  Button,
  Typography,
  CardContent,
  Icon,
  Paper,
  TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshrDialog from './RefreshrListDialog';
import axios from 'axios';

const styles = theme => ({
  wrapper: {
    marginTop: theme.spacing.unit * 6,
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.secondary.main}`,
    ...theme.mixins.gutters(),
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.dark,
    [theme.breakpoints.down('sm')]: {
      width: '80%'
    },
    [theme.breakpoints.only('md')]: {
      width: '60%'
    }
  },
  refreshrList: {
    display: 'flex',
    flexWrap: 'wrap',
    border: `1px solid ${theme.palette.secondary.main}`,
    padding: theme.spacing.unit * 8
  },
  refreshrCard: {
    height: 200,
    border: '1px solid white',
    margin: theme.spacing.unit * 3,
    position: 'relative'
  },
  studentList: {
    display: 'flex',
    flexFlow: 'column wrap',
    border: `1px solid ${theme.palette.secondary.main}`,
    flexWrap: 'wrap',
    padding: theme.spacing.unit * 6
  },
  buttonBox: {
    height: 50
  },
  icon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -40%)'
  },
  title: {
    color: `${theme.palette.primary.contrastText}`
  },
  settingsBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing.unit * 2
  },
  inputs: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main
  }
});

function ClassEditView(props) {
  const { classes } = props;
  const classId = props.match.params.id;
  const token = localStorage.getItem('accessToken');
  const userID = localStorage.getItem('user_id');
  const ax = axios.create({
    baseURL: 'http://localhost:9000', // development
    headers: {
      authorization: `Bearer ${token}`
    }
    // baseURL: 'https://refreshr.herokuapp.com' // production
  });
  const [students, setStudents] = useState([]);
  const [refreshrs, setRefreshrs] = useState([]);
  const [teacherRefs, setTeacherRefs] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // get class details on mount
  useEffect(() => {
    // fetchStudents();
    // fetchRefreshrs();
    // fetchTeacherRefreshrs();
    fetchClass();
    fetchTeacherRefreshrs();
  }, []);

  /*
  useEffect(() => {
    console.log('students:', students);
  }, [students]);

  useEffect(() => {
    console.log('refreshrs:', refreshrs);
  }, [refreshrs]);

  useEffect(() => {
    console.log('teacherRefs:', teacherRefs);
  }, [teacherRefs]);

  useEffect(() => {
    console.log(
      'selectedStudents:',
      selectedStudents
    );
  }, [selectedStudents]);
  */

  async function fetchClass() {
    const res = await ax.get(`/classes/${classId}`);
    console.log(res);
    setStudents(res.data.specifiedClass.students);
    setRefreshrs(res.data.specifiedClass.refreshrs);
  }

  // async function fetchStudents() {
  //   const res = await ax.get(`/classes/${classId}/students`);
  //   setStudents(res.data);
  // }

  async function fetchRefreshrs() {
    const res = await ax.get(`/classes/${classId}/refreshrs`);
    setRefreshrs(res.data);
  }

  async function fetchTeacherRefreshrs(id) {
    // this should be user id, not 35
    const res = await ax.get(`/refreshrs/teachers/${userID}`);
    const unassignedRefreshrs = res.data.filter(r => !refreshrs.includes(r)); // unsure if this filter will work, need to test
    setTeacherRefs(unassignedRefreshrs);
  }

  function addRefreshr(id) {
    const addedRefreshr = teacherRefs.filter(r => r.id === id);
    // const updatedRefreshrs = refreshrs.concat(addedRefreshr); // this is messy :(
    setRefreshrs([...refreshrs, ...addedRefreshr]);
    setTeacherRefs(teacherRefs.filter(r => r.id !== id));
  }

  function removeRefreshr(id) {
    const removedRefreshr = refreshrs.filter(r => r.id === id);
    setTeacherRefs([...teacherRefs, ...removedRefreshr]);
    setRefreshrs(refreshrs.filter(r => r.id !== id));
  }

  function selectStudent(e) {
    const studentId = e.target.value;
    let updatedStudents = selectedStudents;
    if (e.target.checked) {
      updatedStudents = selectedStudents.concat(studentId);
    } else {
      updatedStudents = selectedStudents.filter(s => s !== studentId);
    }
    setSelectedStudents(updatedStudents);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const [newStudent, setNewStudent] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  useEffect(() => {
    console.log(newStudent);
  }, [newStudent]);

  const handleChange = e => {
    console.log(e);

    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value
    });
  };

  async function dropStudents() {
    const res = await ax.post(`/classes/${classId}/drop/`, {
      students: selectedStudents
    });
    console.log('dropped:', res);
    setSelectedStudents([]);
    // fetchStudents(); // better way to do this than calling this here?
  }

  const makeInput = (name, label) => {
    return (
      <TextField
        className={classes.inputs}
        variant="outlined"
        label={label}
        onChange={handleChange}
        name={name}
      />
    );
  };

  return (
    <Grid className={props.classes.wrapper}>
      <Typography variant="h6" className={classes.title}>
        Settings
      </Typography>
      <Grid classname={classes.settings}>
        {makeInput('first_name', 'First Name')}
        {makeInput('last_name', 'Last Name')}
        {makeInput('email', 'Email')}
      </Grid>
      <Typography variant="h6" className={classes.title}>
        Students
      </Typography>
      <Grid className={classes.studentList}>
        {students.map(s => (
          <Grid key={s.student_id}>
            <span>{`${s.name}`}</span>
            <Checkbox
              color="secondary"
              value={`${s.student_id}`}
              checked={selectedStudents.includes(s.student_id)}
              onClick={e => selectStudent(e)}
            />
          </Grid>
        ))}
      </Grid>
      <Grid className={classes.buttonBox}>
        {selectedStudents.length ? (
          <Button variant="outlined" onClick={dropStudents}>
            Remove selected from class
          </Button>
        ) : null}
      </Grid>

      <Grid>
        <Typography variant="h6" className={classes.title}>
          Refreshrs
        </Typography>
        <Grid className={classes.refreshrList}>
          {refreshrs.map(r => (
            <Card className={classes.refreshrCard} key={r.refreshr_id} raised>
              <CardContent>{r.name}</CardContent>
              <CardContent>
                <DeleteIcon onClick={() => removeRefreshr(r.id)} />
              </CardContent>
            </Card>
          ))}
          <RefreshrDialog
            refreshrs={teacherRefs}
            open={modalIsOpen}
            handleClose={closeModal}
            addRefreshr={addRefreshr}
          />
          <Card className={classes.refreshrCard} raised>
            <CardContent>
              <Typography className={classes.title}>Add a Refreshr</Typography>
              <Icon
                className={classes.icon}
                color="action"
                style={{ fontSize: 60 }}
                onClick={() => setModalIsOpen(!modalIsOpen)}
              >
                add_circle
              </Icon>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Button variant="outlined">Save Changes</Button>
    </Grid>
  );
}

export default withStyles(styles, { withTheme: true })(ClassEditView);
