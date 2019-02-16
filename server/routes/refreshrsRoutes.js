const express = require('express');
const router = express.Router();
const db = require('../data/helpers/refreshrHelper');
const jwtCheck = require('../middleware/authenticate');
const {
  emptyCheck,
  whitespaceCheck
} = require('../middleware/formattingMiddleware');
const responseStatus = require('../config/responseStatusConfig');

router.get('/', jwtCheck, async (req, res, next) => {
  try {
    const refreshrs = await db.getAll();
    res.status(responseStatus.success).json(refreshrs);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', jwtCheck, async (req, res, next) => {
  const { id } = req.params;
  try {
    const refreshr = await db.getRefreshr(id);
    res.status(responseStatus.success).json(refreshr);
  } catch (err) {
    if (TypeError) {
      console.log(err);
      next(responseStatus.notFound);
    } else {
      next(err);
    }
  }
});

router.post(
  '/',
  jwtCheck,
  emptyCheck,
  async (req, res, next) => {
    const { body } = req;
    try {
      const newRefreshrID = await db.addRefreshr(body);
      res.status(responseStatus.postCreated).json({ newRefreshrID });
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/:id',
  jwtCheck,
  emptyCheck,
  async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const updatedRecords = await db.updateRefreshr(id, body);
      res.status(responseStatus.success).json({ updatedRecords });
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id', jwtCheck, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRecords = await db.deleteRefreshr(id);
    res.status(responseStatus.success).json({ deletedRecords });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
