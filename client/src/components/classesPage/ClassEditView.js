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
import { addRecipient, addContact } from './SendgridOps';
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
  const [classData, setClassData] = useState({
    name: '',
    id: ''
  });
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addedStudents, setAddedStudents] = useState([]);

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
    setClassData({
      id: res.data.specifiedClass.id,
      name: res.data.specifiedClass.name
    });
  }

  useEffect(() => {
    console.log('classData:', classData);
  }, [classData]);

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

  // useEffect(() => {
  //   console.log(newStudent);
  // }, [newStudent]);

  const handleChange = e => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value
    });
  };

  async function addStudent(e) {
    e.preventDefault();
    console.log(newStudent);
    // add student to typeform recipients, get id back
    const sgStudent = [newStudent];
    let res = await addRecipient(sgStudent);
    console.log(res);
    console.log('recipient:', res.data.persisted_recipients);

    // attach id to newStudent
    newStudent.sg_recipient_id = res.data.persisted_recipients[0];

    // add student to students
    res = await ax.post('/students', newStudent);

    // add student/class to students_classes
    const classId = classData.id;
    console.log('classID:', classId);
    res = await ax.post(`/classes/${classId}`, {
      student_id: newStudent.sg_recipient_id
    });
    console.log(res);

    // add student to class sendgrid contact list
    res = await addContact(classData.id, newStudent.sg_recipient_id);
    console.log(res);

    // setAddedStudents([...addedStudents, newStudent]);
    // clear new student input
    setNewStudent({
      first_name: '',
      last_name: '',
      email: ''
    });

    // get updated data from the server...better way to do this?
    fetchClass();
  }

  async function changeClassName(e) {
    e.preventDefault();
    console.log(e.target.className.value);
    const res = await ax.put(`/classes/${classId}`, {
      name: classData.name,
      sg_list_id: classData.id
    });
    console.log(res);
  }

  function handleClassChange(e) {
    console.log(e.target.value);
    setClassData({
      ...classData,
      name: e.target.value
    });
  }

  useEffect(() => {
    console.log(classData);
  }, [classData]);

  async function dropStudents() {
    const res = await ax.post(`/classes/${classId}/drop/`, {
      students: selectedStudents
    });
    console.log('dropped:', res);
    setSelectedStudents([]);
    // fetchStudents(); // better way to do this than calling this here?
  }

  const makeInput = (
    name,
    label,
    value = newStudent[name],
    onChange = handleChange
  ) => {
    return (
      <TextField
        className={classes.inputs}
        variant="outlined"
        label={label}
        onChange={onChange}
        name={name}
        value={value}
      />
    );
  };

  return (
    <Grid className={props.classes.wrapper}>
      <Typography variant="h6" className={classes.title}>
        Settings
        <form onSubmit={e => changeClassName(e)}>
          {makeInput('className', 'Class Name', classData.name, e =>
            handleClassChange(e)
          )}
          <Button type="submit">Change Class Name</Button>
        </form>
      </Typography>
      <Grid classname={classes.settings}>
        <form onSubmit={e => addStudent(e)}>
          {makeInput('first_name', 'First Name')}
          {makeInput('last_name', 'Last Name')}
          {makeInput('email', 'Email')}
          <Button type="submit">Add Student</Button>
        </form>
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
        {addedStudents.map((s, i) => (
          <Grid key={i}>
            <span style={{ fontWeight: 'bold' }}>{`${s.first_name} ${
              s.last_name
            }`}</span>
            <Checkbox
              color="primary"
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
