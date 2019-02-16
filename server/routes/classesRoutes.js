const express = require('express');
const router = express.Router();

const db = require('../data/helpers/classesHelper')

const jwtCheck = require('../middleware/authenticate');

const responseStatus = require('../config/responseStatusConfig');

router.get('/', jwtCheck, async (req, res, next) => {
  try {
    const classes = await db.getAll()
    res.status(responseStatus.success).json({classes});
  } catch (err) {
    next(responseStatus.serverError)
  }
});

router.post('/', jwtCheck, async (req, res) => {
  try {
    const ids = await db.addClass(req.body);
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

router.get('/:id', )

module.exports = router;
