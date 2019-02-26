const express = require('express');
const configureMiddleware = require('../middleware/globalMiddleware');
const server = express();
const errorHandler = require('../middleware/errorMiddleware');

configureMiddleware(server);

const teachersRoutes = require('../routes/teachersRoutes');
const studentsRoutes = require('../routes/studentsRoutes');
const classesRoutes = require('../routes/classesRoutes');
const questionsRoutes = require('../routes/questionsRoutes');
const billingRoutes = require('../routes/billingRoutes');
const refreshrsRoutes = require('../routes/refreshrsRoutes');
const managementRoutes = require('../routes/managementRoutes');

server.use('/classes', classesRoutes);
server.use('/teachers', teachersRoutes);
server.use('/students', studentsRoutes);
server.use('/questions', questionsRoutes);
server.use('/billing', billingRoutes);
server.use('/refreshrs', refreshrsRoutes);
server.use('', managementRoutes);
server.use(errorHandler);

module.exports = server;
