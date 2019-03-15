const express = require('express');
const router = express.Router();
const db = require('../data/helpers/campaignHelper');
const jwtCheck = require('../middleware/authMiddleware');
const { emptyCheck } = require('../middleware/formattingMiddleware');
const responseStatus = require('../config/responseStatusConfig');

/* CALLS TO TCR TABLE */

router.get('/user/:id', jwtCheck, async (req, res, next) => {
  const { id } = req.params;
  try {
    const campaigns = await db.getDates(id);
    const uniqueRefreshrs = [];
    const uniqueIds = [];
    // filter out unique classes, otherwise we'll get three of each
    for (let c of campaigns) {
      if (!uniqueIds.includes(c.refreshr_id)) {
        uniqueIds.push(c.refreshr_id);
        uniqueRefreshrs.push(c);
      }
      res.status(responseStatus.success).json({ uniqueRefreshrs });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
