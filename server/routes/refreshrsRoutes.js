const express = require('express');
const router = express.Router();
const db = require('../data/helpers/refreshrHelper');
const { emptyCheck } = require('../middleware/formattingMiddleware');
const responseStatus = require('../config/responseStatusConfig');

router.get('/', async (req, res, next) => {
  try {
    const refreshrs = await db.getAll();
    res.status(responseStatus.success).json({ refreshrs });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const refreshr = await db.getRefreshr(id);
    res.status(responseStatus.success).json({ refreshr });
  } catch (err) {
    if (TypeError) {
      console.log(err);
      next(responseStatus.notFound);
    } else {
      next(err);
    }
  }
});

router.post('/', emptyCheck, async (req, res, next) => {
  const { body } = req;
  try {
    const newRefreshrID = await db.addRefreshr(body);
    res.status(responseStatus.postCreated).json({ newRefreshrID });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', emptyCheck, async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedRecords = await db.updateRefreshr(id, body);
    res.status(responseStatus.success).json({ updatedRecords });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRecords = await db.deleteRefreshr(id);
    res.status(responseStatus.success).json({ deletedRecords });
  } catch (err) {
    next(err);
  }
});

router.get('/teachers/:teacherId', async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    const refreshrList = await db.getTeacherRefreshrs(teacherId);
    res.status(responseStatus.success).json(refreshrList);
  } catch (err) {
    console.log(err);
    if (TypeError) {
      next(responseStatus.notFound);
    } else {
      next(err);
    }
  }
});

module.exports = router;
