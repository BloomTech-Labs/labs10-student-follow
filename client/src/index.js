import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import lock from './components/authentication/Auth';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <App lock={lock} history={history} />
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
