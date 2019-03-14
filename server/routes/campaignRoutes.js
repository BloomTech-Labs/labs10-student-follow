const express = require('express');
const router = express.Router();
const db = require('../data/helpers/campaignHelper');
const jwtCheck = require('../middleware/authMiddleware');
const { emptyCheck } = require('../middleware/formattingMiddleware');
const responseStatus = require('../config/responseStatusConfig');

/* CALLS TO TCR TABLE */

router.get('/user/:id', jwtCheck, async (req, res, next) => {
    const {id} = req.params
  try {
    const campaigns = await db.getDates(id);
    res.status(responseStatus.success).json({campaigns});
  } catch (err) {
    next(err);
  }
});

module.exports = router