import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {Auth} from './components'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
require('dotenv').config();

const auth = new Auth()

ReactDOM.render(
  <Router>
    <App  auth={auth}/>
  </Router>,
  document.getElementById('root'),
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
