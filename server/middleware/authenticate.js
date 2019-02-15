const expressjwt = require('express-jwt');
const jwks = require('jwks-rsa');

const jwtCheck = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://nickoferrall.auth0.com/.well-known/jwks.json'
  }),
  audience: 'labs-api',
  issuer: 'https://nickoferrall.auth0.com/',
  algorithms: ['RS256']
});

module.exports = jwtCheck;
