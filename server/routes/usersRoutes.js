const express = require('express');
// const helpers = require('../db/dbHelper/helpers.js');

const router = express.Router();

// gets
router.get('/', async (req, res) => {
  try {
    res.status(200).json('Sanity Check');
  } catch (err) {
    res.status(500).json('Error');
  }
});

module.exports = router;
