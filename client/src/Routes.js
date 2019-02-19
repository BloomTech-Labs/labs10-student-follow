import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import {Auth, LandingPage} from './components';
import history from './history';
import Callback from './Callback';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

export const Routes = () => {
  return (
      <div>
        <Route
          exact path="/"
          render={(props) => <App auth={auth} {...props} />}
        />
        <Route
        path="/home"
        render={props => <LandingPage auth={auth} {...props} />}
      />
        <Route
          path="/callback"
          render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </div>
  );
};
