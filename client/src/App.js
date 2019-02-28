import React, { useState } from 'react';
import { Route, withRouter, Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import history from './history';
import axios from 'axios';
import Typeform from './Typeform';

import {
  Loading,
  LandingPage,
  BillingPage,
  Navbar,
  Navcrumbs,
  RefreshrListView,
  MiscData,
  ClassesPage,
  CampaignForm,
  ClassCreateView,
  ClassEditView
} from './components';

const App = props => {
  const classes = { props };

  /* AUTHENTICATION */
  const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      props.auth.handleAuthentication();
    }
  };

  /* STATE */
  const [refreshrs, setRefreshrs] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [allClasses, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

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
  const getQuestions = options => {
    axios
      .get('https://refreshr.herokuapp.com/questions', options)
      .then(res => {
        console.log('q', res.data.questions);
        setQuestions(res.data.questions);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //all classes
  const getClasses = options => {
    axios
      .get('https://refreshr.herokuapp.com/classes', options)
      .then(res => {
        console.log('c', res.data.classes);
        setClasses(res.data.classes);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //all students
  const getStudents = options => {
    axios
      .get('https://refreshr.herokuapp.com/students', options)
      .then(res => {
        console.log('s', res.data.students);
        setStudents(res.data.students);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //all teachers
  const getTeachers = options => {
    axios
      .get('https://refreshr.herokuapp.com/teachers', options)
      .then(res => {
        console.log('t', res.data.teachers);
        setTeachers(res.data.teachers);
      })
      .catch(err => {
        console.log(err);
      });
  };

  /* ROUTES */
  return (
    <>
      <Router history={history}>
        <Grid
          className={classes.container}
          container
          direction="column"
          spacing={0}
          justify="space-between"
          alignItems="stretch"
        >
          <Grid item>
            <Navbar theme={props.theme} {...props} />
            <Navcrumbs {...props} />
          </Grid>
          <Grid item xs={10}>
            <Route
              exact
              path="/"
              render={props => <LandingPage {...props} />}
            />
            <Route
              path="/loading"
              render={props => {
                handleAuthentication(props);
                return <Loading {...props} />;
              }}
            />
            <Route path="/typeform" component={Typeform} />
            <Route
              path="/refreshrs"
              render={props => (
                <RefreshrListView
                  getRefreshrs={getRefreshrs}
                  refreshrs={refreshrs}
                />
              )}
            />
            <Route path="/billing" render={props => <BillingPage />} />
            <Route exact path="/classes" render={props => <ClassesPage />} />
            <Route
              exact
              path="/classes/create"
              render={props => <ClassCreateView />}
            />
            <Route
              exact
              path="/classes/edit/:id"
              render={props => <ClassEditView {...props} />}
            />
            <Route
              path="/misc"
              render={props => (
                <MiscData
                  allClasses={allClasses}
                  teachers={teachers}
                  students={students}
                  questions={questions}
                  getClasses={getClasses}
                  getTeachers={getTeachers}
                  getQuestions={getQuestions}
                  getStudents={getStudents}
                />
              )}
            />
            <Route path="/campaign" render={props => <CampaignForm />} />{' '}
            {/* for testing */}
          </Grid>
        </Grid>
      </Router>
    </>
  );
};

export default withRouter(App);
