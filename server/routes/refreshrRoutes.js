const express = require('express');
const router = express.Router();

const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.production);

const jwtCheck = require('../middleware/authenticate');

const responseStatus = require('../config/responseStatusConfig');

router.get('/', jwtCheck, async (req, res) => {
  try {
    const refreshr = await db('refreshr');
    res.status(responseStatus.success).json(refreshr);
  } catch (err) {
    res.status(responseStatus.serverError).json('Error');
  }
});

router.post('/', jwtCheck, async (req, res) => {
  try {
    const ids = await db('refreshr').insert(req.body);
    res
      .status(responseStatus.postCreated)
      .json(`Added new refreshr with ID ${ids}`);
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
