const express = require('express');

const router = express.Router();
const responseStatus = require('./responseStatus');

router.get('/', async (req, res) => {
  try {
    const students = db('students');
    res.status(responseStatus.success).json(students);
  } catch (err) {
    res.status(responseStatus.serverError).json('Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const ids = await db('students').insert(req.body);
    res.status(responseStatus.postCreated).json(`Added new log with ID ${ids}`);
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

router.get('/classes', async (req, res) => {
  try {
    const studentsClasses = db('students_classes');
    res.status(responseStatus.success).json(studentsClasses);
  } catch (err) {
    res.status(responseStatus.serverError).json('Error');
  }
});

router.post('/classes', async (req, res) => {
  try {
    const ids = await db('students_classes').insert(req.body);
    res.status(responseStatus.postCreated).json(`Added new log with ID ${ids}`);
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
