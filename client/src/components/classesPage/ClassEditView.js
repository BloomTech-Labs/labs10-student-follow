import React, { useState, useEffect } from 'react';
import { Grid, Checkbox, Card, Select } from '@material-ui/core';
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
  // const [classDetails, setClassDetails] = useState([]);

  // get class details on mount
  useEffect(() => {
    fetchStudents();
    fetchRefreshrs();
  }, []);

  useEffect(() => {
    console.log('students:', students);
  }, [students]);

  useEffect(() => {
    console.log('refreshrs:', refreshrs);
  }, [refreshrs]);

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