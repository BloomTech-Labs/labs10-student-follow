const express = require('express');

const router = express.Router();
const responseStatus = require('./responseStatus');

router.get('/', async (req, res) => {
  try {
    const classes = await db('classes');
    res.status(responseStatus.success).json(classes);
  } catch (err) {
    res.status(responseStatus.serverError).json('Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const ids = await db('classes').insert(req.body);
    res
      .status(responseStatus.postCreated)
      .json(`Added new class with ID ${ids}`);
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
