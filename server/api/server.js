const express = require('express');
const configureMiddleware = require('../middleware/globalMiddleware');
const errorHandler = require('../middleware/errorMiddleware')
const {jwtCheck} = require('../middleware/authMiddleware')
const server = express();

configureMiddleware(server);

const authRoutes = require('../routes/authRoutes')
const teachersRoutes = require('../routes/teachersRoutes');
const studentsRoutes = require('../routes/studentsRoutes');
const classesRoutes = require('../routes/classesRoutes');
const questionsRoutes = require('../routes/questionsRoutes');
const billingRoutes = require('../routes/billingRoutes');
const refreshrsRoutes = require('../routes/refreshrsRoutes');

server.use(jwtCheck)
server.use('/auth', authRoutes)
server.use('/classes', classesRoutes);
server.use('/teachers', teachersRoutes);
server.use('/students', studentsRoutes);
server.use('/questions', questionsRoutes);
server.use('/billing', billingRoutes);
server.use('/refreshrs', refreshrsRoutes);
server.use(errorHandler);


module.exports = server;
