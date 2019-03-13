import React, { useState, useEffect } from 'react';
import moment from 'moment';
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
    paddingLeft: '3%',
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
    //DEVELOPMENT
    baseURL: 'http://localhost:9000',
    //PRODUCTION
    //baseURL: 'https://refreshr.herokuapp.com'

    headers: {
      authorization: `Bearer ${token}`
    }
  });
  // sendgrix axios instance
  const sgAx = axios.create({
    baseURL: 'https://api.sendgrid.com/v3',
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}`
    }
  });
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [refreshrs, setRefreshrs] = useState([]);
  const [displayRefreshrs, setDisplayRefreshrs] = useState([]); // to filter multiple campaigns
  const [teacherRefs, setTeacherRefs] = useState([]);
  const [allTeacherRefs, setAllTeacherRefs] = useState([]);
  const [classData, setClassData] = useState({
    name: '',
    sg_list_id: ''
  });
  const [activeRefreshr, setActiveRefreshr] = useState(null);
  const [addedRefreshr, setAddedRefreshr] = useState(null);
  const [isEditingClass, setIsEditingClass] = useState(false);
  const [isEditingStudents, setIsEditingStudents] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [activeStudent, setActiveStudent] = useState(null);

  // useEffect(() => {
  //   console.log('selectedStudents:', selectedStudents);
  // }, [selectedStudents]);

  // get class details on mount
  useEffect(() => {
    fetchClass();
  }, []);

  useEffect(() => {
    console.log('students:', students);
  }, [students]);

  /*
  useEffect(() => {
    console.log('refreshrs:', refreshrs);
  }, [refreshrs]);

*/
  useEffect(() => {
    console.log('teacherRefs:', teacherRefs);
  }, [teacherRefs]);

  async function fetchClass() {
    const res = await ax.get(`/classes/${classId}`);
    console.log(res);
    setStudents(res.data.specifiedClass.students);
    setRefreshrs(res.data.specifiedClass.refreshrs);
    setClassData({
      id: res.data.specifiedClass.sg_list_id,
      name: res.data.specifiedClass.name
    });
    fetchTeacherRefreshrs();
  }

  useEffect(() => {
    // filter out unique refreshrs
    let uniqueRefreshrIds = [];
    let uniqueRefreshrs = [];
    refreshrs.map(r => {
      if (!uniqueRefreshrIds.includes(r.refreshr_id)) {
        uniqueRefreshrIds.push(r.refreshr_id);
        uniqueRefreshrs.push(r);
      }
    });
    setDisplayRefreshrs(uniqueRefreshrs);
    console.log(displayRefreshrs);
  }, [refreshrs]);

  useEffect(() => {
    const classIds = refreshrs.map(r => r.refreshr_id);
    console.log('class ids', classIds);
    const teacherIds = allTeacherRefs.map(r => r.refreshr_id);
    console.log('teacher ids', teacherIds);
    const unassignedRefreshrIds = teacherIds.filter(
      id => !classIds.includes(id)
    );
    console.log('unassigned:', unassignedRefreshrIds);
    const unassignedRefreshrs = allTeacherRefs.filter(r =>
      unassignedRefreshrIds.includes(r.refreshr_id)
    );
    console.log(unassignedRefreshrs);
    setTeacherRefs(unassignedRefreshrs);
  }, [refreshrs, allTeacherRefs]);

  async function fetchTeacherRefreshrs() {
    const res = await ax.get(`/teachers/${userID}/refreshrs`);
    // console.log('RES:', res);
    setAllTeacherRefs(res.data.refreshrs);
    // const unassignedRefreshrs = res.data.refreshrs.filter(r =>
    //   refreshrs.includes(r)
    // );
    // console.log(unassignedRefreshrs);

    // const classRefreshrIds = refreshrs.map(r => r.refreshr_id);
    // console.log(classRefreshrIds);
    // const unassignedRefreshrIds = res.data.refreshrs.filter(
    //   r => !classRefreshrIds.includes(r.refreshr_id)
    // );
    // console.log('ids:', unassignedRefreshrIds);
    // const unassignedRefreshrs = res.data.refreshrs.filter(r =>
    //   unassignedRefreshrIds.includes(r.refreshr_id)
    // );
    // const uniqueRefreshrs = [];
    // const uniqueRefreshrIds = [];
    // filter out duplicate refreshrs
    // unassignedRefreshrs.map(r => {
    //   if (!uniqueRefreshrIds.includes(r.refreshr_id)) {
    //     uniqueRefreshrIds.push(r.refreshr_id);
    //     uniqueRefreshrs.push(r);
    //   }
    // });
    // console.log(unassignedRefreshrs);

    // setTeacherRefs(unassignedRefreshrs);
  }

  async function addRefreshr(id) {
    // date has been selected, send off to sendgrid and add to db
    console.log(addedRefreshr);
    // will need to refactor this later with moment?
    // const send_at = {
    //   send_at: Date.parse(activeRefreshr.date) / 1000
    // };
    // console.log('send at:', send_at);
    // console.log(typeof send_at.send_at);

    // set 3 refreshr times
    const twoDaysUnix = moment(`${addedRefreshr.date}T00:00:00`)
      .add(2, 'day')
      .unix();
    const twoWeeksUnix = moment(`${addedRefreshr.date}T00:00:00`)
      .add(2, 'weeks')
      .unix();
    const twoMonthsUnix = moment(`${addedRefreshr.date}T00:00:00`)
      .add(2, 'month')
      .unix();

    addedRefreshr.timeTriData = [
      { send_at: twoDaysUnix },
      { send_at: twoWeeksUnix },
      { send_at: twoMonthsUnix }
    ];

    // create sendgrid campaign
    const body = {
      sender_id: 428251, // maybe we should move this to an env variable?
      title: addedRefreshr.name,
      subject: `Your Refreshr for ${classData.name} is here!`,
      plain_content: 'this is plain content [unsubscribe]',
      html_content: `<html> <head> <title></title> </head> <body> <p>Take your refreshr at this link: ${
        addedRefreshr.typeform_url
      } [unsubscribe] </p> </body> </html>`,
      list_ids: [Number(classData.id)],
      suppression_group_id: 9332 // permanent (Unsubscribe ID)
    };
    // console.log('body:', body);

    // create three campaigns
    for (let i = 0; i < 3; i++) {
      let res = await sgAx.post('/campaigns', body);
      console.log(res);
      const sg_campaign_id = res.data.id;
      console.log('sgid:', sg_campaign_id);

      // attach sendgrid campaign id to active refreshr
      // const refreshr = {
      //   ...activeRefreshr,
      //   refreshr_id: activeRefreshr.id,
      //   sg_campaign_id
      // };
      addedRefreshr.sg_campaign_id = sg_campaign_id;

      // add refreshr to TCR table
      res = await ax.post(`/classes/${classData.id}/campaigns`, {
        refreshr_id: addedRefreshr.refreshr_id,
        teacher_id: userID,
        date: addedRefreshr.date,
        sg_campaign_id
      });

      console.log(res);
      // schedule campaign
      res = await sgAx.post(
        `/campaigns/${sg_campaign_id}/schedules`,
        addedRefreshr.timeTriData[i]
      );
      console.log(res);
    }

    // add refreshr to class refreshrs, remove from active refreshr
    // setRefreshrs(refreshrs.concat(addedRefreshr));
    setAddedRefreshr(null);
    fetchClass(); // need to update class data here
    console.log(refreshrs);
  }

  useEffect(() => {
    console.log(addedRefreshr);
  }, [addedRefreshr]);

  function selectNewRefreshr(id) {
    // remove refreshr from teacher refreshr list
    console.log(id);

    setTeacherRefs(teacherRefs.filter(r => r.refreshr_id !== id));
    console.log(id);
    const [active] = teacherRefs.filter(r => r.refreshr_id === id);
    console.log(active);
    setActiveRefreshr(null);
    setAddedRefreshr(active);
  }

  async function removeRefreshr(id) {
    console.log(addedRefreshr);
    const removedRefreshrs = refreshrs.filter(r => r.refreshr_id === id);
    console.log(removedRefreshrs);

    // cancel sendgrid campaigns
    for (let refreshr of removedRefreshrs) {
      let res = await sgAx.delete(`/campaigns/${refreshr.sg_campaign_id}`);
      console.log(res);

      // drop from TCR table
      res = await ax.delete(
        `/classes/${classData.id}/campaigns/${refreshr.sg_campaign_id}`
      );
      console.log(res);
    }

    // fetch updated class info
    fetchClass();
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

  useEffect(() => {
    console.log(activeStudent);
  }, [activeStudent]);

  const toggleEditStudent = student => {
    // const [student] = students.filter(s => s.student_id === studentId);
    // console.log(student);
    // student.isEditing = !student.isEditing;
    console.log(student);
    console.log(student === activeStudent);
    if (student === activeStudent) {
      delete student.isActiveStudent;
      setActiveStudent(null);
    } else {
      if (activeStudent) delete activeStudent.isActiveStudent;
      student.isActiveStudent = true;
      setActiveStudent(student);
    }
  };

  async function updateStudent(e, student) {
    console.log(e.target.name);
    setActiveStudent({
      ...activeStudent,
      isActiveStudent: true,
      [e.target.name]: e.target.value
    });
    console.log(activeStudent);
  }

  async function submitUpdatedStudent(e) {
    e.preventDefault();
    console.log(activeStudent);

    // update student with sendgrid
    let res = await sgAx.patch('/contactdb/recipients', [
      {
        email: activeStudent.email,
        first_name: activeStudent.first_name,
        last_name: activeStudent.last_name
      }
    ]);
    console.log(res);

    delete activeStudent.isActiveStudent;

    // update student in DB
    res = await ax.put(`/students/${activeStudent.student_id}`, {
      first_name: activeStudent.first_name,
      last_name: activeStudent.last_name,
      email: activeStudent.email,
      sg_recipient_id: activeStudent.student_id
    });
    console.log(res);

    // remove student from students, add to active student
    const updatedStudents = students.filter(
      s => s.student_id !== activeStudent.student_id
    );
    setStudents([...updatedStudents, activeStudent]);
    setActiveStudent(null);
    console.log(activeStudent);
    console.log(students);
  }

  async function addStudent(e) {
    e.stopPropagation();
    e.preventDefault();
    if (newStudent.first_name && newStudent.last_name && newStudent.email) {
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

  // useEffect(() => {
  //   console.log(classData);
  // }, [classData]);

  async function dropStudent(studentId) {
    const res = await ax.delete(`/classes/${classId}/students/${studentId}`);
    console.log('dropped:', res);

    // drop student from sg list
    const deleteRes = await deleteContact(classId, studentId);
    console.log(deleteRes);
    fetchClass(); // better way to do this than calling this again here?

    // reset selected students
    setSelectedStudents([]);
  }

  async function selectRefreshr(id) {
    console.log(id);
    const [selectedRefreshr] = refreshrs.filter(r => r.refreshr_id === id);
    setActiveRefreshr(selectedRefreshr);
    console.log(activeRefreshr);
    console.log(activeRefreshr === selectedRefreshr);
  }

  async function changeDate(e) {
    console.log(activeRefreshr);
    console.log(activeRefreshr.date);
    console.log(e.target.value);
    activeRefreshr.date = e.target.value; // think we need to do this on submit?
  }

  async function submitNewDate(e) {
    e.preventDefault();
    console.log(e);
    // set 3 refreshr times
    const twoDaysUnix = moment(`${activeRefreshr.date}T00:00:00`)
      .add(2, 'day')
      .unix();
    const twoWeeksUnix = moment(`${activeRefreshr.date}T00:00:00`)
      .add(2, 'weeks')
      .unix();
    const twoMonthsUnix = moment(`${activeRefreshr.date}T00:00:00`)
      .add(2, 'month')
      .unix();

    const timeTriData = [
      { send_at: twoDaysUnix },
      { send_at: twoWeeksUnix },
      { send_at: twoMonthsUnix }
    ];

    // get three campaigns
    let campaigns = refreshrs.filter(
      r => r.refreshr_id === activeRefreshr.refreshr_id
    );

    console.log(campaigns);
    campaigns = campaigns.map(c => c.sg_campaign_id);
    console.log(campaigns);

    // update campaigns
    for (let i = 0; i < 3; i++) {
      const res = await sgAx.patch(
        `/campaigns/${campaigns[i]}/schedules`,
        timeTriData[i]
      );
      console.log(res);
    }
  }

  const makeInput = (
    name,
    label,
    value = newStudent[name],
    onChange = handleChange,
    type = 'text'
  ) => {
    return (
      <Input
        className={classes.inputs}
        disableUnderline
        placeholder={label}
        onChange={onChange}
        name={name}
        value={value}
        type={type}
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
        dropStudent={dropStudent}
        toggleEditStudent={toggleEditStudent}
        setActiveStudent={setActiveStudent}
        activeStudent={activeStudent}
        updateStudent={updateStudent}
        submitUpdatedStudent={submitUpdatedStudent}
      />

      <hr className={classes.hrStyle} />
      <Refreshrs
        refreshrs={displayRefreshrs}
        removeRefreshr={removeRefreshr}
        addedRefreshr={addedRefreshr}
        setAddedRefreshr={setAddedRefreshr}
        addRefreshr={addRefreshr}
        selectRefreshr={selectRefreshr}
        teacherRefs={teacherRefs}
        selectRefreshr={selectRefreshr}
        selectNewRefreshr={selectNewRefreshr}
        activeRefreshr={activeRefreshr}
        changeDate={changeDate}
        submitNewDate={submitNewDate}
        makeInput={makeInput}
      />
    </Paper>
  );
}

export default withStyles(styles, { withTheme: true })(ClassEditView);
