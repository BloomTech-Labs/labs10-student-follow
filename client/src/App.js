import React, { useEffect } from 'react';
import { Route, withRouter, Router } from 'react-router-dom';
import history from './history';
import { LoadingPage, LandingPage, BillingPage, Login } from './components';

const App = (props) => {
  console.log('APP:', props);
  const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      props.auth.handleAuthentication();
    }
  };

  return (
    <Router history={history}>
      <div>
        <Route exact path="/" render={() => <Login auth={props.auth} />} />
        <Route path="/home" render={(props) => <LandingPage {...props} />} />
        <Route
          path="/loading"
          render={(props) => {
            handleAuthentication(props);
            return <LoadingPage {...props} />;
          }}
        />
        <Route path="/billing" render={(props) => <BillingPage />} />
      </div>
    </Router>
  );
};

export default withRouter(App);
