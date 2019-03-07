import React, { useState, useEffect } from 'react';
import {
  Grid,
  Checkbox,
  Card,
  Button,
  Typography,
  CardContent,
  Icon,
  TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshrDialog from './RefreshrListDialog';
import {
  addRecipient,
  addContact,
  deleteContact
} from './SendgridOps';
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
  activeRefreshr: {
    height: 200,
    border: '1px solid red',
    margin: theme.spacing.unit * 3,
    position: 'relative'
  },
  studentList: {
    display: 'flex',
    flexFlow: 'column wrap',
    border: `1px solid ${theme.palette.secondary.main}`,
    flexWrap: 'wrap',
    width: '80%',
    maxHeight: theme.spacing.unit * 50,
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
    sg_list_id: ''
  });
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addedStudents, setAddedStudents] = useState([]);
  const [activeRefreshr, setActiveRefreshr] = useState(null);

  // sendgrix axios instance
  const sgAx = axios.create({
    baseURL: 'https://api.sendgrid.com/v3',
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}`
    }
  });
  // get class details on mount
  useEffect(() => {
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

*/
  useEffect(() => {
    console.log('selectedStudents:', selectedStudents);
  }, [selectedStudents]);

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

  // async function fetchRefreshrs() {
  //   const res = await ax.get(`/classes/${classId}/refreshrs`);
  //   setRefreshrs(res.data);
  // }

  async function fetchTeacherRefreshrs(id) {
    const res = await ax.get(`/teachers/${userID}/refreshrs`);
    const unassignedRefreshrs = res.data.filter(r => !refreshrs.includes(r)); // filter out refreshrs assigned to class
    setTeacherRefs(unassignedRefreshrs);
  }

  async function addRefreshr(id) {
    // date has been selected, send off to sendgrid and add to db
    console.log(activeRefreshr);
    // will need to refactor this later with moment?
    const send_at = {
      "send_at": Date.parse(activeRefreshr.date) / 1000,
    }
    console.log('send at:', send_at);
    console.log(typeof send_at.send_at);

    // create sendgrid campaign
    const body = {
      sender_id: 428251, // maybe we should move this to an env variable?
      title: activeRefreshr.name,
      subject: `Your Refreshr for ${classData.name} is here!`,
      plain_content: 'this is plain content [unsubscribe]',
      html_content: `<html> <head> <title></title> </head> <body> <p>Take your refreshr at this link: ${activeRefreshr.typeform_url} [unsubscribe] </p> </body> </html>`,
      list_ids: [Number(classData.id)],
      suppression_group_id: 9332, // permanent (Unsubscribe ID)
    };
    // console.log('body:', body);
    let res = await sgAx.post('/campaigns', body);
    console.log(res);
    const sg_campaign_id = res.data.id;
    console.log('sgid:', sg_campaign_id);

    // attach sendgrid campaign id to active refreshr

    const refreshr = {
      ...activeRefreshr,
      refreshr_id: activeRefreshr.id,
      sg_campaign_id
    }

    // add refreshr to TCR table
    res = await ax.post(`/classes/${classData.id}/refreshrs`, {
      refreshr: refreshr,
      teacher_id: userID
    });

    console.log(res)

    // schedule campaign
    res = await sgAx.post(`/campaigns/${sg_campaign_id}/schedules`, {
      send_at: 1554206400
    })
    console.log(res);


    // add refreshr to class refreshrs, remove from active refreshr
    setRefreshrs(refreshrs.concat(activeRefreshr));
    setActiveRefreshr(null);
    console.log(refreshrs);
  }

  useEffect(() => {
    console.log(activeRefreshr);
  }, [activeRefreshr]);

  function selectRefreshr(id) {
    // remove refreshr from teacher refreshr list
    setTeacherRefs(teacherRefs.filter(r => r.id !== id));
    console.log(id);
    const [active] = teacherRefs.filter(r => r.id === id);
    console.log(active);
    setActiveRefreshr(active);
  }

  function setDate(e) {
    console.log(e.target.value);
    setActiveRefreshr({ ...activeRefreshr, date: e.target.value });
  }

  function removeRefreshr(id) {
    // TODO: needs to be updated to kill sendgrid campaign, drop from TCR table
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

  const handleChange = e => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value
    });
  };

  async function addStudent(e) {
    e.preventDefault();
    // add student to sendgrid recipients, get id back
    const sgStudent = [newStudent];
    let res = await addRecipient(sgStudent);
    console.log('recipient:', res.data.persisted_recipients);

    // attach id to newStudent
    newStudent.sg_recipient_id = res.data.persisted_recipients[0];

    // add student to students
    res = await ax.post('/students', newStudent);

    // add student/class to students_classes
    const classId = classData.id;
    console.log('classID:', classId);
    res = await ax.post(`/classes/${classId}/students`, {
      student_id: newStudent.sg_recipient_id
    });
    console.log(res);

    // add student to class's sendgrid contact list
    res = await addContact(classData.id, newStudent.sg_recipient_id);
    console.log(res);

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
    for (let student of selectedStudents) {
      const res = await ax.delete(`/classes/${classId}/students/${student}`);
      console.log('dropped:', res);

      // drop student from sg list
      deleteContact(classId, student);
    }
    fetchClass(); // better way to do this than calling this here?

    // reset selected students
    setSelectedStudents([]);
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
      <Grid className={classes.settings}>
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
              <CardContent>{r.date}</CardContent>
              <CardContent>
                <DeleteIcon onClick={() => removeRefreshr(r.id)} />
              </CardContent>
            </Card>
          ))}
          {activeRefreshr && (
            <Card
              className={classes.activeRefreshr}
              key={activeRefreshr.id}
              raised
            >
              <CardContent>{activeRefreshr.name}</CardContent>
              <TextField
                onChange={e => setDate(e)}
                variant="outlined"
                type="date"
              />
              {activeRefreshr.date && (
                <Button onClick={addRefreshr}>Submit</Button>
              )}
            </Card>
          )}
          <RefreshrDialog
            refreshrs={teacherRefs}
            open={modalIsOpen}
            handleClose={closeModal}
            addRefreshr={addRefreshr}
            selectRefreshr={selectRefreshr}
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
