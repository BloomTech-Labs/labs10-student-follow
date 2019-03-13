import React, { useState } from 'react';

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
//Nick: 107121249233689789684
//Justin: 111419810728121424056
//Chaya:  117894219650456694049
//Tim: 118406831139005715496
//Sawyer: 117948376948362801545

const App = props => {
  const { classes } = props;
  const token = localStorage.getItem('accessToken');
  const user_id = localStorage.getItem('user_id');
  //console.log(user_id)

  /* STATE */

  const [open, toggleOpen] = useState(false);
  const [userRefreshrs, setRefreshrs] = useState([]);
  const [userClasses, setClasses] = useState([]);
  // const [students, setStudents] = useState([]);
  // const [teachers, setTeachers] = useState([]);

  /* METHODS */

  //all refreshrs for user

  const getRefreshrs = () => {
    axios({
      method: 'get',
      url: `http://localhost:9000/teachers/${user_id}/refreshrs`,

      //url: `https://refreshr.herokuapp.com/teachers/${user_id}/refreshrs`,
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setRefreshrs(res.data.refreshrs);
      })
      .catch(err => console.log(err));
  };

  const sendRefreshrToDB = async (refreshr, questions) => {
    console.log('Initial Question Obj', questions);
    const questionArray = [
      {
        question: questions.questionTextOne,
        answer_1: questions.answers.a1Text,
        answer_2: questions.answers.a2Text,
        answer_3: questions.answers.a3Text,
        answer_4: questions.answers.a4Text
      },
      {
        question: questions.questionTextTwo
      }
    ];
    await axios({
      method: 'post',
      //Development
      url: 'http://localhost:9000/refreshrs',
      //Production
      //url: 'https://refreshr.herokuapp.com/refreshrs',
      headers: { Authorization: `Bearer ${token}` },
      data: refreshr
    })
      .then(res => {
        localStorage.setItem('refreshrID', res.data.newRefreshrID);
        axios({
          method: 'post',
          //Development
          url: `http://localhost:9000/teachers/${user_id}/refreshrs`,
          //Production
          //url: `https://refreshr.herokuapp.com/teachers/${user_id}/refreshrs`,
          headers: { Authorization: `Bearer ${token}` },
          data: { refreshr_id: res.data.newRefreshrID }
        }).then(res => {
          console.log('T_R ID', res.data.message);
          //setMessage(res.data.message)
        });
      })
      .catch(err => {
        console.log(err);
      });

    for (let i = 0; i < questionArray.length; i++) {
      const refreshrID = localStorage.getItem('refreshrID');
      axios({
        method: 'post',
        //Development
        url: 'http://localhost:9000/questions',
        //Production
        //url: 'https://refreshr.herokuapp.com/questions',
        headers: { Authorization: `Bearer ${token}` },
        data: questionArray[i]
      })
        .then(res => {
          console.log('Q ID', res);
          console.log('REF ID', refreshrID);
          axios({
            method: 'post',
            //Development
            url: `http://localhost:9000/refreshrs/${refreshrID}/questions`,
            //Production
            //url: `https://refreshr.herokuapp.com/refreshrs/${refreshrID}/questions`,
            headers: { Authorization: `Bearer ${token}` },
            data: { question_id: res.data.newQuestionID }
            //console.log('RES from add questions ===', res);
          }).then(res => {
            console.log('Q_R', res.data.results[0]);
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const updateRefreshrDB = async (refreshr, id, questions) => {
    const questionIDs = [
      questions.questionTextOne.id,
      questions.questionTextTwo.id
    ];
    const questionArray = [
      {
        question: questions.questionTextOne.text,
        answer_1: questions.answers.a1Text,
        answer_2: questions.answers.a2Text,
        answer_3: questions.answers.a3Text,
        answer_4: questions.answers.a4Text
      },
      {
        question: questions.questionTextTwo.text
      }
    ];
    await axios({
      method: 'put',
      //Development
      url: `http://localhost:9000/refreshrs/${id}`,
      //Production
      //url: `https://refreshr.herokuapp.com/refreshrs/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      data: refreshr
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    for (let i = 0; i < questionArray.length; i++) {
      axios({
        method: 'put',
        //Development
        url: `http://localhost:9000/questions/${questionIDs[i]}`,
        //Production
        //url: 'https://refreshr.herokuapp.com/questions',
        headers: { Authorization: `Bearer ${token}` },
        data: questionArray[i]
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
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
        //console.log('CLASSES:', res);
        setClasses(res.data.classes);
      })
      .catch(err => console.log(err));
  };

  //PRICING MODAL
  const toggleModal = () => {
    toggleOpen(!open);
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
          <Navbar
            theme={props.theme}
            lock={props.lock}
            toggleModal={toggleModal}
          />
          <Navcrumbs location={props.location} history={props.history} />
        </Grid>
        <Route
          exact
          path="/"
          render={props => (
            <LandingPage {...props} toggleModal={toggleModal} open={open} />
          )}
        />
        <Grid item className={classes.routes}>
          <Route
            path="/dashboard"
            render={props => (
              <Dashboard
                token={token}
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
            path="/refreshrs/edit/:id"
            render={props => (
              <RefreshrEdit
                token={token}
                getClasses={getClasses}
                userClasses={userClasses}
                getRefreshrs={getRefreshrs}
                userRefreshrs={userRefreshrs}
                updateRefreshrDB={updateRefreshrDB}
                match={props.match}
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
            render={props => <Refreshr sendRefreshrToDB={sendRefreshrToDB} />}
          />
          <Route path="/campaign" render={props => <CampaignForm />} />{' '}
          {/* for testing */}
        </Grid>
      </Grid>
    </>
  );
};

export default withRouter(withStyles(styles, { withTheme: true })(App));
