const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const usersRoutes = require('../routes/usersRoutes');

module.exports = (server) => {
  server.use(helmet());
  server.use(express.json());
  server.use(morgan('dev'));
  server.use('/sanity', usersRoutes);
};
