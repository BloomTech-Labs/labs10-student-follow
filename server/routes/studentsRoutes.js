const express = require('express');
const router = express.Router();

const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.production);

const jwtCheck = require('../middleware/authenticate');

const responseStatus = require('../config/responseStatusConfig');

router.get('/', jwtCheck, async (req, res) => {
  try {
    const students = await db('students');
    res.status(responseStatus.success).json(students);
  } catch (err) {
    res.status(responseStatus.serverError).json('Error');
  }
});

router.post('/', jwtCheck, async (req, res) => {
  try {
    const ids = await db('students').insert(req.body);
    res
      .status(responseStatus.postCreated)
      .json(`Added new student with ID ${ids}`);
  } catch (error) {
    if (error.errno === 19) {
      res
        .status(responseStatus.badRequest)
        .json("You haven't entered the required information.");
    } else {
      res.status(responseStatus.serverError).json(error);
    }
  }
});

router.get('/classes', jwtCheck, async (req, res) => {
  try {
    const studentsClasses = await db('students_classes');
    res.status(responseStatus.success).json(studentsClasses);
  } catch (err) {
    res.status(responseStatus.serverError).json('Error');
  }
});

router.post('/classes', jwtCheck, async (req, res) => {
  try {
    const ids = await db('students_classes').insert(req.body);
    res
      .status(responseStatus.postCreated)
      .json(`Added new student class with ID ${ids}`);
  } catch (error) {
    if (error.errno === 19) {
      res
        .status(responseStatus.badRequest)
        .json("You haven't entered the required information.");
    } else {
      res.status(responseStatus.serverError).json(error);
    }
  }
});

module.exports = router;
