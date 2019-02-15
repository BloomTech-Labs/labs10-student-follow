require('dotenv').config();

const server = require('./server/api/server');

const PORT = process.env.PORT || 9000;

// server.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

////

const express = require('express');
const expressjwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');

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

// const checkScopes = jwtAuthz(['read:messages']);

server.get('/authorized', async (req, res) => {
  try {
    // const token = generateToken();
    // console.log('TOKEN', token);
    res.send('Secured Resource');
  } catch (error) {
    res.status(500).json(console.log('Err', error));
  }
});

server.get('/elon', jwtCheck, async (req, res) => {
  try {
    res.send('Funding secured');
  } catch (error) {
    res.status(500).json(error);
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
