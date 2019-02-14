const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const port = process.env.PORT || 8080;

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://nickoferrall.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://refreshr.herokuapp.com/api',
  issuer: 'https://nickoferrall.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function(req, res) {
  res.send('Secured Resource');
});

app.listen(port);
