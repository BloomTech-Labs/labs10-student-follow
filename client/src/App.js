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
  //console.log('ENV:', process.env);
  const { classes } = props;
  const token = localStorage.getItem('accessToken');
  const user_id = localStorage.getItem('user_id');

  /* STATE */
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
      url: `http://localhost:9000/teachers/28/refreshrs`,
      //url: `https://refreshr.herokuapp.com/teachers/${user_id}/refreshrs`,
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        //console.log(res);
        console.log('REFRESHRS', res)
        setRefreshrs(res.data.refreshrs);
      })
      .catch(err => console.log(err));
  };

  //all Questions
  useEffect(() => {
    axios
      .get('https://refreshr.herokuapp.com/questions')
      .then(res => {
        console.log('Getting questions', res.data.questions);
        setQuestions(res.data.questions);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  //add questions
  const addQuestions = question => {
    console.log('Question from addQuestions ===', question);
    axios
      .post('https://refreshr.herokuapp.com/questions', question)
      // .post('http://localhost/9000/questions', question)
      .then(res => {
        console.log('RES from add questions ===', res);
        setQuestions([]);
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
          <Navbar theme={props.theme} lock={props.lock}  />
          <Navcrumbs location={props.location} history={props.history}/>
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
              <Refreshr addQuestions={addQuestions} url={url} setUrl={setUrl} />
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
