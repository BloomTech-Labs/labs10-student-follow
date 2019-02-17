const express = require('express');
const router = express.Router();
const db = require('../data/helpers/classesHelper');
const jwtCheck = require('../middleware/authenticate');
const { emptyCheck } = require('../middleware/formattingMiddleware');
const responseStatus = require('../config/responseStatusConfig');

router.get('/', jwtCheck, async (req, res, next) => {
  try {
    const classes = await db.getAll();
    res.status(responseStatus.success).json(classes);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', jwtCheck, async (req, res, next) => {
  const { id } = req.params;
  try {
    const specifiedClass = await db.getClass(id);
    res.status(responseStatus.success).json(specifiedClass);
  } catch (err) {
    if (TypeError) {
      next(responseStatus.notFound);
    } else {
      next(err);
    }
  }
});

router.post('/', jwtCheck, emptyCheck, async (req, res, next) => {
  const { body } = req;
  try {
    const newClassID = await db.addClass(body);
    res.status(responseStatus.postCreated).json({ newClassID });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', jwtCheck, emptyCheck, async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedRecords = await db.updateClass(id, body);
    res.status(responseStatus.success).json({ updatedRecords });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', jwtCheck, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRecords = await db.deleteClass(id);
    res.status(responseStatus.success).json({ deletedRecords });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
