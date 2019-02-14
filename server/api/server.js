const express = require('express');
const configureMiddleware = require('../middleware/globalMiddleware');
const server = express();

configureMiddleware(server);

const teachersRoutes = require('../routes/teachersRoutes');

server.use('/teachers', teachersRoutes);

module.exports = server;
