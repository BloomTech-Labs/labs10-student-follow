import React, { Component } from 'react';

class Home extends Component {
  login = () => {
    this.props.auth.login();
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {isAuthenticated() && <h4>You are logged in!</h4>}
        {!isAuthenticated() && (
          <h4>
            You are not logged in! Please{' '}
            <h2 style={{ cursor: 'pointer' }} onClick={this.login()}>
              Log In
            </h2>{' '}
            to continue.
          </h4>
        )}
      </div>
    );
  }
}

export default Home;

// import React from 'react';

// export default function LandingPage(props) {
//   return (
//     <>
//       {props.people.map((people) => (
//         <div key={people.id}>
//           <h1>{people.firstname}</h1>
//         </div>
//       ))}
//     </>
//   );
// }
