const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://team-refreshr.auth0.com/.well-known/jwks.json'
  }),
  //production
  //audience: 'https://refreshr.herokuapp.com',
  //development
  audience: 'http://localhost:9000',
  issuer: 'https://team-refreshr.auth0.com/',
  algorithms: ['RS256'],
});

module.exports = {jwtCheck}