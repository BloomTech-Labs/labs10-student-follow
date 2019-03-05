import React, { useState, useEffect } from 'react';
import {
  Grid,
  Checkbox,
  Card,
  Button,
  Typography,
  CardContent,
  Icon
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshrDialog from './RefreshrListDialog';
import axios from 'axios';

const styles = theme => ({
  wrapper: {
    color: 'white',
    marginTop: 50
  },
  refreshrList: {
    display: 'flex',
    flexWrap: 'wrap',
    border: '1px solid black'
  },
  refreshrCard: {
    width: '25%',
    height: 200,
    border: '1px solid white',
    margin: theme.spacing.unit * 3,
    position: 'relative'
  },
  studentList: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid white',
    flexWrap: 'wrap',
    height: '30vh'
  },
  buttonBox: {
    height: 50
  },
  icon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -40%)'
  }
});

function ClassEditView(props) {
  const { classes } = props;
  const classId = props.match.params.id;
  const token = localStorage.getItem('accessToken');
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

  async function fetchStudents() {
    const res = await ax.get(`/classes/${classId}/students`);
    setStudents(res.data);
  }

  async function fetchRefreshrs() {
    const res = await ax.get(`/classes/${classId}/refreshrs`);
    setRefreshrs(res.data);
  }

  async function fetchTeacherRefreshrs(id) {
    // this should be user id, not 35
    const res = await ax.get('/refreshrs/teachers/35');
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

  async function dropStudents() {
    const res = await ax.post(`/classes/${classId}/drop/`, {
      students: selectedStudents
    });
    console.log('dropped:', res);
    setSelectedStudents([]);
    fetchStudents(); // better way to do this than calling this here?
  }

  return (
    <Grid className={props.classes.wrapper}>
      <h1>Students</h1>
      <Grid className={classes.studentList}>
        {students.map(s => (
          <Grid key={s.student_id}>
            <span>{`${s.name}`}</span>
            <Checkbox
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
        <h1>Refreshrs</h1>
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

export default withStyles(styles)(ClassEditView);
