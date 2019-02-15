const express = require('express');
const router = express.Router();

const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.testing);

const jwtCheck = require('../middleware/authenticate');

const responseStatus = require('../config/responseStatusConfig');

router.get('/', jwtCheck, async (req, res) => {
  try {
    const teachers = await db('teachers');
    res.status(responseStatus.success).json(teachers);
  } catch (err) {
    console.log('Err', err);
    res.status(responseStatus.serverError).json('Error');
  }
});

router.post('/', jwtCheck, async (req, res) => {
  try {
    const ids = await db('teachers').insert(req.body);
    res
      .status(responseStatus.postCreated)
      .json(`Added new teacher with ID ${ids}`);
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
    const teachersClasses = await db('classes_teachers');
    res.status(responseStatus.success).json(teachersClasses);
  } catch (err) {
    res.status(responseStatus.serverError).json('Error');
  }
});

router.post('/classes', jwtCheck, async (req, res) => {
  try {
    const ids = await db('classes_teachers').insert(req.body);
    res
      .status(responseStatus.postCreated)
      .json(`Added new teacher classs with ID ${ids}`);
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
