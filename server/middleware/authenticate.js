const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const authenticate = jwt({
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

module.exports = authenticate;
