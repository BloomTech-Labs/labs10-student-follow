import React, { useState } from 'react';
import { Route, withRouter, Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import history from './history';
import {
  LoadingPage,
  LandingPage,
  Login,
  BillingPage,
  Navbar,
  Navcrumbs,
  ClassView,
  RefreshrList
} from './components';

const App = props => {
  const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      props.auth.handleAuthentication();
    }
  };
  const [open, setOpen] = useState(false);

  const togglePage = () => {
    setOpen(!open);
  };
  console.log('PROPS:', history);

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
            <Route path="/refreshrs" render={props => <RefreshrList />} />
            <Route path="/billing" render={props => <BillingPage />} />
            <Route path="/classes" render={props => <ClassView />} />
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default withRouter(App);
