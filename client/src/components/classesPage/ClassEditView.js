import React, { useState, useEffect } from 'react';
import { Grid, Checkbox, Card, Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const styles = theme => ({
  wrapper: {
    color: 'white'
  },
  card: {
    width: 200,
    height: 200,
    border: '1px solid white',
    margin: theme.spacing.unit * 3
  }
});

function ClassEditView(props) {
  const { classes } = props;
  const classId = props.match.params.id;
  const ax = axios.create({
    baseURL: 'http://localhost:9000' // development
  });
  const [students, setStudents] = useState([]);
  const [refreshrs, setRefreshrs] = useState([]);
  const [teacherRefs, setTeacherRefs] = useState([]);
  // const [classDetails, setClassDetails] = useState([]);

  // get class details on mount
  useEffect(() => {
    fetchStudents();
    fetchRefreshrs();
    fetchTeacherRefreshrs();
  }, []);

  useEffect(() => {
    console.log('students:', students);
  }, [students]);

  useEffect(() => {
    console.log('refreshrs:', refreshrs);
  }, [refreshrs]);

  useEffect(() => {
    console.log('teacherRefs:', teacherRefs);
  }, [teacherRefs]);

  async function fetchStudents() {
    console.log(classId);
    const res = await ax.get(`/classes/${classId}/students`);
    console.log(res);
    setStudents(res.data);
  }

  async function fetchRefreshrs() {
    const res = await ax.get(`/classes/${classId}/refreshrs`);
    console.log(res);
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
    const updatedRefreshrs = refreshrs.concat(addedRefreshr); // kinda messy, can make it cleaner later
    setRefreshrs(updatedRefreshrs);
    setTeacherRefs(teacherRefs.filter(r => r.id !== id));
  }

  return (
    <Grid className={props.classes.wrapper}>
      <h1>ClassEditView Component</h1>
      <Grid>
        <h1>Students</h1>
        {students.map(s => (
          <Grid key={s.id}>
            <span>{`${s.firstname} ${s.lastname}`}</span>
            <Checkbox />
          </Grid>
        ))}
        <h1>Refreshrs</h1>
        <span>Add a refreshr to this class</span>
        <Select onChange={e => addRefreshr(e.target.value)}>
          {teacherRefs.map(r => (
            <MenuItem value={r.id}>{r.name}</MenuItem>
          ))}
        </Select>
        {refreshrs.map(r => (
          <Card className={classes.card} key={r.id} raised>
            {r.name}
          </Card>
        ))}
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(ClassEditView);
