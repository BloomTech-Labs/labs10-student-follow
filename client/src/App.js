import React, { useState, useEffect } from 'react';

import { Route, withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
  LandingPage,
  BillingPage,
  Refreshr,
  RefreshrEdit,
  Navbar,
  Navcrumbs,
  RefreshrListView,
  Dashboard,
  //ClassesPage,
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
  const { classes } = props;
  const token = localStorage.getItem('accessToken');
  const user_id = localStorage.getItem('user_id');

  /* STATE */
  const [message, setMessage] = useState('');
  const [url, setUrl] = useState('');
  const [userRefreshrs, setRefreshrs] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [userClasses, setClasses] = useState([]);
  // const [students, setStudents] = useState([]);
  // const [teachers, setTeachers] = useState([]);

  /* METHODS */

  //all refreshrs for user

  const getRefreshrs = () => {
    axios({
      method: 'get',
      url: `http://localhost:9000/teachers/${user_id}/refreshrs`,
      // url: `http://localhost:9000/refreshrs`,
      //url: `http://localhost:9000/teachers/114/refreshrs`,

      //url: `https://refreshr.herokuapp.com/teachers/${user_id}/refreshrs`,
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setRefreshrs(res.data.refreshrs);
      })
      .catch(err => console.log(err));
  };

  const sendRefreshrToDB = refreshr => {
    axios({
      method: 'post',
      //Development
      url: 'http://localhost:9000/refreshrs',
      //Production
      //url: 'http://refreshr.herokuapp.com/questions'
      headers: { Authorization: `Bearer ${token}` },
      data: refreshr
    })
      .then(res => {
        //console.log(res)
        axios({
          method: 'post',
          //Development
          url: `http://localhost:9000/teachers/${user_id}/refreshrs`,
          //Production
          //url: 'http://refreshr.herokuapp.com/questions'
          headers: { Authorization: `Bearer ${token}` },
          data: res.data.newRefreshrID
        }).then(res => {
          setMessage(res.data.message);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  //add questions
  const addQuestions = question => {
    //console.log('Question from addQuestions ===', question);
    axios({
      method: 'post',
      //Development
      url: 'http://localhost:9000/questions',
      //Production
      //url: 'http://refreshr.herokuapp.com/questions'
      headers: { Authorization: `Bearer ${token}` },
      data: question
    })
      .then(res => {
        console.log(res);
        //console.log('RES from add questions ===', res);
        setQuestions([]);
        //console.log(questions)
      })
      .catch(err => {
        console.log(err);
      });
  };

  //all classes for user
  const getClasses = () => {
    axios({
      method: 'get',
      url: `http://localhost:9000/teachers/${user_id}/classes`,
      //url: `https://refreshr.herokuapp.com/teachers/${user_id}/classes`,
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        console.log(res);
        setClasses(res.data.classes);
      })
      .catch(err => console.log(err));
  };

  /* ROUTES */
  return (
    //console.log('APP:', props.theme),
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
          <Navbar theme={props.theme} lock={props.lock} />
          <Navcrumbs location={props.location} history={props.history} />
        </Grid>
        <Route exact path="/" render={props => <LandingPage {...props} />} />
        <Grid item className={classes.routes}>
          <Route
            path="/dashboard"
            render={props => (
              <Dashboard
                getClasses={getClasses}
                userClasses={userClasses}
                getRefreshrs={getRefreshrs}
                userRefreshrs={userRefreshrs}
              />
            )}
          />
          <Route
            exact
            path="/refreshrs"
            render={props => (
              <RefreshrListView
                getRefreshrs={getRefreshrs}
                refreshrs={userRefreshrs}
              />
            )}
          />
          <Route
            path="/refreshrs/edit"
            render={props => (
              <RefreshrEdit
                getClasses={getClasses}
                userClasses={userClasses}
                getRefreshrs={getRefreshrs}
                userRefreshrs={userRefreshrs}
                questions={questions}
              />
            )}
          />
          <Route path="/billing" render={props => <BillingPage />} />
          <Route exact path="/classes" render={props => <ClassListView />} />
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
                sendRefreshrToDB={sendRefreshrToDB}
              />
            )}
          />
          <Route path="/campaign" render={props => <CampaignForm />} />{' '}
          {/* for testing */}
        </Grid>
      </Grid>
    </>
  );
};

export default withRouter(withStyles(styles, { withTheme: true })(App));
