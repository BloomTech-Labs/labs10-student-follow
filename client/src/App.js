import React, { useState } from 'react';
import { Route, withRouter, Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
  LandingPage,
  BillingPage,
  Refreshr,
  Navbar,
  Navcrumbs,
  RefreshrListView,
  Dashboard,
  ClassesPage,
  CampaignForm,
  ClassCreateView,
  ClassEditView,
  ClassListView
} from './components';

const styles = theme => ({
  container: {
    margin: 0,
    padding: 0,
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  routes: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    marginTop: 64,
    justifyContent: 'space-between',
    width: '100%',
     [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${200}px)`,
      marginRight: 200
     }
  }
});

const App = props => {
  console.log('ENV:', process.env);
  const { classes } = props;
  const token = localStorage.getItem('accessToken');
  const user_id = localStorage.getItem('user_id');

  /* STATE */
  const [url, setUrl] = useState('');
  const [refreshrs, setRefreshrs] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [allClasses, setClasses] = useState([]);
  // const [students, setStudents] = useState([]);
  // const [teachers, setTeachers] = useState([]);

  /* METHODS */

  //all refreshrs

  const getRefreshrs = options => {
    axios
      .get('https://refreshr.herokuapp.com/refreshrs', options)
      .then(res => {
        console.log('data', res.data);
        setRefreshrs(res.data.refreshrs);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //all Questions
  // const getQuestions = options => {
  //   axios
  //     .get('https://refreshr.herokuapp.com/questions', options)
  //     .then(res => {
  //       console.log('q', res.data.questions);
  //       setQuestions(res.data.questions);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // add questions
  const addQuestions = question => {
    axios
      .post('https://refreshr.herokuapp.com/questions', question)
      .then(res => {
        setQuestions([]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //all classes
  const getClasses = options => {
    axios({
      method: 'get',
      url: `https://refreshr.herokuapp.com/${user_id}`,
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        console.log(res);
        setClasses(res.data.teacher.classes);
      })
      .catch(err => console.log(err));
  };

  // //all students
  // const getStudents = options => {
  //   axios
  //     .get('https://refreshr.herokuapp.com/students', options)
  //     .then(res => {
  //       console.log('s', res.data.students);
  //       setStudents(res.data.students);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // //all teachers
  // const getTeachers = options => {
  //   axios
  //     .get('https://refreshr.herokuapp.com/teachers', options)
  //     .then(res => {
  //       console.log('t', res.data.teachers);
  //       setTeachers(res.data.teachers);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  /* ROUTES */
  return (
    console.log('APP:', props.theme),
    console.log('APP:', props.Url),
    (
      <>
          <Grid
            container
            direction="column"
            spacing={0}
            justify="space-between"
            alignItems="center"
            className={classes.container}
          >
            <Grid item>
              <Navbar theme={props.theme} {...props} />
              <Navcrumbs {...props} />
            </Grid>
            <Route
                exact path="/"
                render={props => <LandingPage {...props} />}
            />
            <Grid item className={classes.routes}>
             
              <Route
                path="/dashboard"
                render={props => (
                  <Dashboard getClasses={getClasses} allClasses={allClasses} />
                )}
              />
              <Route
                exact
                path="/refreshrs"
                render={props => (
                  <RefreshrListView
                    getRefreshrs={getRefreshrs}
                    refreshrs={refreshrs}
                  />
                )}
              />
              <Route path="/billing" render={props => <BillingPage />} />
              <Route
                exact
                path="/classes"
                render={props => <ClassListView />}
              />
              <Route
                exact
                path="/classes/edit/:id"
                render={props => <ClassEditView {...props} />}
              />
              <Route
                exact
                path="/classes/create"
                render={props => <ClassCreateView />}
              />
              <Route
                exact
                path="/refreshrs/create"
                render={props => (
                  <Refreshr
                    addQuestions={addQuestions}
                    url={url}
                    setUrl={setUrl}
                  />
                )}
              />
              <Route path="/campaign" render={props => <CampaignForm />} />{' '}
              {/* for testing */}
            </Grid>
          </Grid>
      </>
    )
  );
};

export default withRouter(withStyles(styles, { withTheme: true })(App));
