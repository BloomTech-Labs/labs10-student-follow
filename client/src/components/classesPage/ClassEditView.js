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
  TextField,
  FormGroup,
  Input,
  Fab
} from '@material-ui/core';
import Update from '@material-ui/icons/Update';
import GroupAdd from '@material-ui/icons/GroupAdd';
import { withStyles } from '@material-ui/core/styles';
import { addRecipient, addContact, deleteContact } from './SendgridOps';
import axios from 'axios';
import Settings from './components/Settings';
import Students from './components/Students';
import Refreshrs from './components/Refreshrs';

const styles = theme => ({
  wrapper: {
    border: `1px solid ${theme.palette.secondary.main}`,
    ...theme.mixins.gutters(),
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 8,
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 4,
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.dark,
    [theme.breakpoints.only('sm')]: {
      width: '60vw'
    },
    [theme.breakpoints.only('xs')]: {
      width: '90vw'
    },
    [theme.breakpoints.up('md')]: {
      width: '50vw'
    }
  },

  refreshrIcon: {
    alignSelf: 'flex-end',
    margin: '5%',
    color: theme.palette.primary.dark,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  inputBtnDiv: {
    border: '1px solid red',
    display: 'flex',
    flexFlow: 'column nowrap',
    paddingLeft: '10%'
  },
  btn: {
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.primary.main,
    background: theme.palette.secondary.main,
    width: 40,
    height: 40
  },

  icon: {
    alignSelf: 'center',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  newTitle: {
    color: `${theme.palette.secondary.contrastText}`,
    textAlign: 'center',
    fontSize: '1.6rem'
  },
  title: {
    color: `${theme.palette.primary.contrastText}`,
    textAlign: 'center'
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
  inputs: {
    marginBottom: theme.spacing.unit,
    padding: '.75%',
    paddingLeft: 70,
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    fontSize: '1em',
    width: 200,
    borderRadius: 5
    // [theme.breakpoints.only('xs')]: {
    //   marginRight: '5%'
    // }
  },
  hrStyle: {
    margin: '1rem auto',
    width: '100%'
  },
  saveButton: {
    background: theme.palette.secondary.main,
    color: theme.palette.primary.dark,
    padding: '1%',
    display: 'flex',
    flexFlow: 'row nowrap',
    fontSize: '1.2rem',
    width: '50%',
    marginTop: '5%',
    '&:hover': {
      background: theme.palette.secondary.dark
    }
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
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [refreshrs, setRefreshrs] = useState([]);
  const [teacherRefs, setTeacherRefs] = useState([]);
  const [classData, setClassData] = useState({
    name: '',
    sg_list_id: ''
  });
  const [activeRefreshr, setActiveRefreshr] = useState(null);
  const [isEditingClass, setIsEditingClass] = useState(false);
  const [isEditingStudents, setIsEditingStudents] = useState(false);

  useEffect(() => {
    console.log('selectedStudents:', selectedStudents);
  }, [selectedStudents]);

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

  async function fetchClass() {
    const res = await ax.get(`/classes/${classId}`);
    console.log(res);
    setStudents(res.data.specifiedClass.students);
    setRefreshrs(res.data.specifiedClass.refreshrs);
    setClassData({
      id: res.data.specifiedClass.sg_list_id,
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
    console.log('RES:', res);
    const unassignedRefreshrs = res.data.refreshrs.filter(
      r => !refreshrs.includes(r)
    ); // filter out refreshrs assigned to class
    setTeacherRefs(unassignedRefreshrs);
  }

  async function addRefreshr(id) {
    // date has been selected, send off to sendgrid and add to db
    console.log(activeRefreshr);
    // will need to refactor this later with moment?
    const send_at = {
      send_at: Date.parse(activeRefreshr.date) / 1000
    };
    console.log('send at:', send_at);
    console.log(typeof send_at.send_at);

    // create sendgrid campaign
    const body = {
      sender_id: 428251, // maybe we should move this to an env variable?
      title: activeRefreshr.name,
      subject: `Your Refreshr for ${classData.name} is here!`,
      plain_content: 'this is plain content [unsubscribe]',
      html_content: `<html> <head> <title></title> </head> <body> <p>Take your refreshr at this link: ${
        activeRefreshr.typeform_url
      } [unsubscribe] </p> </body> </html>`,
      list_ids: [Number(classData.id)],
      suppression_group_id: 9332 // permanent (Unsubscribe ID)
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
    };

    // add refreshr to TCR table
    res = await ax.post(`/classes/${classData.id}/refreshrs`, {
      refreshr: refreshr,
      teacher_id: userID
    });

    console.log(res);

    // schedule campaign
    res = await sgAx.post(`/campaigns/${sg_campaign_id}/schedules`, {
      send_at: 1554206400
    });
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

  function removeRefreshr(id) {
    // TODO: needs to be updated to kill sendgrid campaign, drop from TCR table
    const removedRefreshr = refreshrs.filter(r => r.id === id);
    setTeacherRefs([...teacherRefs, ...removedRefreshr]);
    setRefreshrs(refreshrs.filter(r => r.id !== id));
  }

  const [newStudent, setNewStudent] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  useEffect(() => {
    console.log('NEW STUDENT', newStudent);
  }, [newStudent]);

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
    setIsEditingClass(false);
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
    fetchClass(); // better way to do this than calling this again here?

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
      <Input
        className={classes.inputs}
        disableUnderline
        placeholder={label}
        onChange={onChange}
        name={name}
        value={value}
      />
    );
  };

  return (
    <Paper className={props.classes.wrapper}>
      <Settings
        handleClassChange={handleClassChange}
        changeClassName={changeClassName}
        makeInput={makeInput}
        classData={classData}
        isEditingClass={isEditingClass}
        setIsEditingClass={setIsEditingClass}
        isEditingStudents={isEditingStudents}
        setIsEditingStudents={isEditingStudents}
      />
      <hr className={classes.hrStyle} />
      <Students
        makeInput={makeInput}
        addStudent={addStudent}
        students={students}
        selectedStudents={selectedStudents}
        setSelectedStudents={setSelectedStudents}
        dropStudents={dropStudents}
      />

      <hr className={classes.hrStyle} />
      <Refreshrs
        refreshrs={refreshrs}
        removeRefreshr={removeRefreshr}
        activeRefreshr={activeRefreshr}
        setActiveRefreshr={setActiveRefreshr}
        addRefreshr={addRefreshr}
        selectRefreshr={selectRefreshr}
        teacherRefs={teacherRefs}
      />
    </Paper>
  );
}

export default withStyles(styles, { withTheme: true })(ClassEditView);
