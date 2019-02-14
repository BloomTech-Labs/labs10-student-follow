const express = require('express');
const configureMiddleware = require('../middleware/globalMiddleware');
const server = express();

configureMiddleware(server)


module.exports = server;