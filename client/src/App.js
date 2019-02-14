import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './containers/LandingPage.js';

class App extends Component {
  state = {
    data: [{ message: 'Hey', id: 1 }],
  };

  componentDidMount() {}

  render() {
    if (!this.state.data.length) {
      return (
        <>
          <p>Loading please wait...</p>
        </>
      );
    }
    return (
      <>
        <Route
          path="/"
          render={(props) => <LandingPage {...props} data={this.state.data} />}
        />
      </>
    );
  }
}

export default App;
