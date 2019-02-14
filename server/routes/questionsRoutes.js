const express = require('express');
const router = express.Router();

const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.production);

const responseStatus = require('../config/responseStatusConfig');

router.get('/', async (req, res) => {
  try {
    const questions = await db('questions');
    res.status(responseStatus.success).json(questions);
  } catch (err) {
    res.status(responseStatus.serverError).json('Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const ids = await db('questions').insert(req.body);
    res
      .status(responseStatus.postCreated)
      .json(`Added new question set with ID ${ids}`);
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
