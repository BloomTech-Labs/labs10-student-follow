import Auth0Lock from 'auth0-lock';
import axios from 'axios';

const clientID = 'jNDq5B6iAnIRcrpM07Omh05uyppZ89px';
const domain = 'team-refreshr.auth0.com';
const options = {
  languageDictionary: {
    title: ""
  },
  auth: {
    //PRODUCTION
    audience: 'https://refreshr.herokuapp.com',
    redirectUrl: 'https://refreshr-app.netlify.com/dashboard',
    //DEVELOPMENT
    //audience: 'http://localhost:9000',
    //redirectUrl: 'http://localhost:3000/dashboard',
    redirect: true,
    usernameStyle: 'email',
    responseType: 'token id_token', 
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
    //console.log(authResult);

    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('name', `${profile.name}`);
    localStorage.setItem('email', profile.email)
    localStorage.setItem('user_id', profile['https://refreshr.herokuapp.com/uid']);

    const body = {
      first_name: profile.given_name,
      last_name: profile.family_name,
      email: profile.email,
      user_id: profile['https://refreshr.herokuapp.com/uid'],
      role: profile['https://refreshr.herokuapp.com/roles'][0]
    };
    //console.log(body)
    //This captures users and adds them to the teacher table upon login, if they already exist
    //200 OK will be sent and the unique constraint will be shown in the console.
    axios({
      method: 'post',
      url: 'https://refreshr.herokuapp.com/teachers',
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
