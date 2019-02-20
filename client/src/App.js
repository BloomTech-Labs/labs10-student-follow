import React, { useState } from 'react';
import { Route, withRouter, Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import history from './history';
import axios from 'axios';

import {
  LoadingPage,
  LandingPage,
  Login,
  BillingPage,
  Navbar,
  Navcrumbs,
  ClassPage,
  RefreshrList,
  CreateEditPage
} from './components';

const App = props => {
  /* AUTHENTICATION */
  const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      props.auth.handleAuthentication();
    }
  };

  /* STATE */
  const [open, setOpen] = useState(false);
  const [refreshrs, setRefreshrs] = useState([]);

  /* METHODS */
  //Nav
  const togglePage = () => {
    setOpen(!open);
  };
  //Refreshrs
  const getRefreshrs = (options) => {
    axios
      .get('https://refreshr.herokuapp.com/refreshrs', options)
      .then(res => {
        console.log('data', res.data);
        setRefreshrs(res.data.refreshrs);
        //console.log('re, app', refreshrs)
      })
      .catch(err => {
        console.log(err);
      });
  };

  /* ROUTES */
  return (
    <Router history={history}>
      <div>
        <Navcrumbs open={open} {...props} />
        <Grid
          container
          spacing={0}
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={2}>
            <Navbar open={open} togglePage={togglePage} />
          </Grid>
          <Grid item xs={10}>
            <Route exact path="/" render={() => <Login auth={props.auth} />} />
            <Route path="/home" render={props => <LandingPage {...props} />} />
            <Route
              path="/loading"
              render={props => {
                handleAuthentication(props);
                return <LoadingPage {...props} />;
              }}
            />
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
            <Route path="/classes" render={props => <ClassPage />} />
            <Route path="/classesCEP" render={props => <CreateEditPage />} />
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default withRouter(App);
