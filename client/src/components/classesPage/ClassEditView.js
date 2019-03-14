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
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // get class details on mount
  useEffect(() => {
    fetchClass();
  }, []);

  async function fetchClass() {
    try {
      const res = await ax.get(`/classes/${classId}`);
      setStudents(res.data.specifiedClass.students);
      setRefreshrs(res.data.specifiedClass.refreshrs);
      setClassData({
        id: res.data.specifiedClass.sg_list_id,
        name: res.data.specifiedClass.name
      });
      fetchTeacherRefreshrs();
    } catch (err) {
      console.log(err);
    }
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
  }, [refreshrs]);

  useEffect(() => {
    const classIds = refreshrs.map(r => r.refreshr_id);
    const teacherIds = allTeacherRefs.map(r => r.refreshr_id);
    const unassignedRefreshrIds = teacherIds.filter(
      id => !classIds.includes(id)
    );
    const unassignedRefreshrs = allTeacherRefs.filter(r =>
      unassignedRefreshrIds.includes(r.refreshr_id)
    );
    setTeacherRefs(unassignedRefreshrs);
  }, [refreshrs, allTeacherRefs]);

  async function fetchTeacherRefreshrs() {
    const res = await ax.get(`/teachers/${userID}/refreshrs`);
    setAllTeacherRefs(res.data.refreshrs);
  }

  async function addRefreshr(id) {
    try {
      // date has been selected, send off to sendgrid and add to db
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
        plain_content: 'Take your refreshr at this link [unsubscribe]',
        html_content: `<html> <head> <title></title> </head> <body> <p>Take your refreshr at this link: ${
          addedRefreshr.typeform_url
        } [unsubscribe] </p> </body> </html>`,
        list_ids: [Number(classData.id)],
        suppression_group_id: 9332 // permanent (Unsubscribe ID)
      };

      // create three campaigns
      for (let i = 0; i < 3; i++) {
        let res = await sgAx.post('/campaigns', body);
        const sg_campaign_id = res.data.id;

        addedRefreshr.sg_campaign_id = sg_campaign_id;

        // add refreshr to TCR table
        await ax.post(`/classes/${classData.id}/campaigns`, {
          refreshr_id: addedRefreshr.refreshr_id,
          teacher_id: userID,
          date: addedRefreshr.date,
          sg_campaign_id
        });

        // schedule campaign
        await sgAx.post(
          `/campaigns/${sg_campaign_id}/schedules`,
          addedRefreshr.timeTriData[i]
        );
      }

      // add refreshr to class refreshrs, remove from active refreshr
      setAddedRefreshr(null);
      fetchClass(); // need to update class data here
    } catch (err) {
      console.log(err);
    }
  }

  function selectNewRefreshr(id) {
    // remove refreshr from teacher refreshr list
    setTeacherRefs(teacherRefs.filter(r => r.refreshr_id !== id));
    const [active] = teacherRefs.filter(r => r.refreshr_id === id);
    setActiveRefreshr(null);
    setAddedRefreshr(active);
    setModalIsOpen(false);
  }

  async function removeRefreshr(id) {
    try {
      const removedRefreshrs = refreshrs.filter(r => r.refreshr_id === id);

      // cancel sendgrid campaigns
      for (let refreshr of removedRefreshrs) {
        await sgAx.delete(`/campaigns/${refreshr.sg_campaign_id}`);

        // drop from TCR table
        await ax.delete(
          `/classes/${classData.id}/campaigns/${refreshr.sg_campaign_id}`
        );
      }

      // fetch updated class info
      fetchClass();
    } catch (err) {
      console.log(err);
    }
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

  const toggleEditStudent = student => {
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
    try {
      setActiveStudent({
        ...activeStudent,
        isActiveStudent: true,
        [e.target.name]: e.target.value
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function submitUpdatedStudent(e) {
    try {
      e.preventDefault();

      // update student with sendgrid
      await sgAx.patch('/contactdb/recipients', [
        {
          email: activeStudent.email,
          first_name: activeStudent.first_name,
          last_name: activeStudent.last_name
        }
      ]);

      delete activeStudent.isActiveStudent;

      // update student in DB
      await ax.put(`/students/${activeStudent.student_id}`, {
        first_name: activeStudent.first_name,
        last_name: activeStudent.last_name,
        email: activeStudent.email,
        sg_recipient_id: activeStudent.student_id
      });

      // remove student from students, add to active student
      const updatedStudents = students.filter(
        s => s.student_id !== activeStudent.student_id
      );
      setStudents([...updatedStudents, activeStudent]);
      setActiveStudent(null);
    } catch (err) {
      console.log(err);
    }
  }

  async function addStudent(e) {
    try {
      e.stopPropagation();
      e.preventDefault();
      if (newStudent.first_name && newStudent.last_name && newStudent.email) {
        // add student to sendgrid recipients, get id back
        const sgStudent = [newStudent];
        const res = await addRecipient(sgStudent);

        // attach id to newStudent
        newStudent.sg_recipient_id = res.data.persisted_recipients[0];

        // add student to students
        await ax.post('/students', newStudent);

        // add student/class to students_classes
        const classId = classData.id;
        await ax.post(`/classes/${classId}/students`, {
          student_id: newStudent.sg_recipient_id
        });

        // add student to class's sendgrid contact list
        await addContact(classData.id, newStudent.sg_recipient_id);

        // clear new student input
        setNewStudent({
          first_name: '',
          last_name: '',
          email: ''
        });

        // get updated data from the server...better way to do this?
        fetchClass();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function changeClassName(e) {
    try {
      e.preventDefault();
      const res = await ax.put(`/classes/${classId}`, {
        name: classData.name,
        sg_list_id: classData.id
      });
      setIsEditingClass(false);
    } catch (err) {
      console.log(err);
    }
  }

  function handleClassChange(e) {
    setClassData({
      ...classData,
      name: e.target.value
    });
  }

  async function dropStudent(studentId) {
    try {
      await ax.delete(`/classes/${classId}/students/${studentId}`);

      // drop student from sg list
      await deleteContact(classId, studentId);
      fetchClass(); // better way to do this than calling this again here?

      // reset selected students
      setSelectedStudents([]);
    } catch (err) {
      console.log(err);
    }
  }

  async function selectRefreshr(id) {
    try {
      const [selectedRefreshr] = refreshrs.filter(r => r.refreshr_id === id);
      setActiveRefreshr(selectedRefreshr);
    } catch (err) {
      console.log(err);
    }
  }

  async function changeDate(e) {
    try {
      activeRefreshr.date = e.target.value; // think we need to do this on submit?
    } catch (err) {
      console.log(err);
    }
  }

  async function submitNewDate(e) {
    try {
      if (e) e.preventDefault();
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

      campaigns = campaigns.map(c => c.sg_campaign_id);
      campaigns = campaigns.map(c => c.sg_campaign_id);

      // update campaigns
      for (let i = 0; i < 3; i++) {
        const res = await sgAx.patch(
          `/campaigns/${campaigns[i]}/schedules`,
          timeTriData[i]
        );
      }
    } catch (err) {
      console.log(err);
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
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        className={classData.name}
      />
    </Paper>
  );
}

export default withStyles(styles, { withTheme: true })(ClassEditView);
