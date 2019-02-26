import React, { useState } from 'react';
import { Route, withRouter, Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import history from './history';
import axios from 'axios';
import Typeform from './Typeform';

import {
  LoadingPage,
  LandingPage,
  Login,
  BillingPage,
  Navbar,
  Navcrumbs,
  ClassView,
  RefreshrList,
  MiscData,
  ClassPage,
  CampaignForm
} from './components';

const App = props => {
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
    <Router history={history}>
      <div >
      <Navbar  />

        <Navcrumbs  {...props} />
        <Grid
          container
          spacing={0}
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={10}>
            <Route path="/home" render={props => <LandingPage {...props} />} />
            <Route
              path="/loading"
              render={props => {
                handleAuthentication(props);
                return <LoadingPage {...props} />;
              }}
            />
            <Route path="/typeform" component={Typeform} />
            <Route
              path="/refreshrs"
              render={props => (
                <RefreshrList
                  getRefreshrs={getRefreshrs}
                  refreshrs={refreshrs}
                />
              )}
            />
            <Route path="/billing" render={props => <BillingPage />} />
            <Route path="/classesCEP" render={props => <ClassPage />} />
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
            <Route path="/classes" render={props => <ClassView />} />
            <Route path="/campaign" render={props => <CampaignForm />} />{' '}
            {/* for testing */}
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default withRouter(App);
