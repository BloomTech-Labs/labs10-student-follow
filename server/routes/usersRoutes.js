const express = require('express');
// const helpers = require('../db/dbHelper/helpers.js');

const router = express.Router();
const responseStatus = require('../config/responseStatusConfig');

// gets
router.get('/', async (req, res) => {
  try {
    res.status(responseStatus.success).json('Sanity Check');
  } catch (err) {
    res.status(responseStatus.serverError).json('Error');
  }
});

module.exports = router;
