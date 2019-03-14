import Auth0Lock from 'auth0-lock';
import axios from 'axios';

const clientID = 'jNDq5B6iAnIRcrpM07Omh05uyppZ89px';
const domain = 'team-refreshr.auth0.com';
const options = {
  languageDictionary: {
    title: ''
  },
  auth: {
    //PRODUCTION
    // audience: 'https://refreshr.herokuapp.com',
    // redirectUrl: 'https://refreshr-app.netlify.com/dashboard',
    //DEVELOPMENT
    audience: 'http://localhost:9000',
    redirectUrl: 'http://localhost:3000/dashboard',
    redirect: true,
    usernameStyle: 'email',
    responseType: 'token id_token'
  },

  socialButtonStyle: 'small',
  theme: {
    primaryColor: '#0b2742',
    backgroundColor: '#000',
    logo: 'http://i67.tinypic.com/vfgxf8.png'
  },
  loginAfterSignup: true,
  additionalSignUpFields: [
    {
      name: 'given_name',
      placeholder: 'First Name',
      icon: 'http://i63.tinypic.com/2z886rs.png'
    },
    {
      name: 'family_name',
      placeholder: 'Last Name',
      icon: 'http://i63.tinypic.com/2z886rs.png'
    }
  ]
};

const lock = new Auth0Lock(clientID, domain, options);

lock.on('authenticated', authResult => {
  // Use the token in authResult to getUserInfo() and save it to localStorage
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      alert(error);
      return;
    }

    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('name', `${profile.given_name}`);
    localStorage.setItem('email', profile.email);
    // PRODUCTION
    //localStorage.setItem('user_id', profile['https://refreshr.herokuapp.com/uid']);
    // DEVELOPMENT
    localStorage.setItem('user_id', profile['http://localhost:9000/uid']);

    const body = {
      first_name: profile.given_name,
      last_name: profile.family_name,
      email: profile.email,
      //PRODUCTION
      // user_id: profile['https://refreshr.herokuapp.com/uid'],
      // role: profile['https://refreshr.herokuapp.com/roles'][0]
      //DEVELOPMENT
      user_id: profile['http://localhost:9000/uid'],
      role: profile['http://localhost:9000/roles'][0]
    };
    //This captures users and adds them to the teacher table upon login, if they already exist
    //200 OK will be sent and the unique constraint will be shown in the console.
    axios({
      method: 'post',
      //PRODUCTION
      //url: 'https://refreshr.herokuapp.com/teachers',
      //DEVELOPMENT
      url: 'http://localhost:9000/teachers',

      headers: { Authorization: `Bearer ${authResult.accessToken}` },
      data: body
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  });
});

lock.on('authorization_error', error => {
  lock.show({
    flashMessage: {
      type: 'error',
      text: error.errorDescription
    }
  });
});


export default lock;
