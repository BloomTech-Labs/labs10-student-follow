const express = require('express');
// const helpers = require('../db/dbHelper/helpers.js');

const router = express.Router();
const responseStatus = require('./responseStatus');

// gets
router.get('/', async (req, res) => {
  try {
    res.status(responseStatus.success).json('Sanity Check');
  } catch (err) {
    res.status(responseStatus.serverError).json('Error');
  }
});

router.get('/teachers', async (req, res) => {
  try {
    const teachers = db('teachers');
    res.status(responseStatus.success).json(teachers);
  } catch (err) {
    res.status(responseStatus.serverError).json('Error');
  }
});

router.get('/students', async (req, res) => {
  try {
    const students = db('teachers');
    res.status(responseStatus.success).json(students);
  } catch (err) {
    res.status(responseStatus.serverError).json('Error');
  }
});

module.exports = router;
