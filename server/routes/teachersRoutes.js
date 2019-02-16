const express = require('express');
const router = express.Router();
const db = require('../data/helpers/teacherHelper')

const jwtCheck = require('../middleware/authenticate');

const responseStatus = require('../config/responseStatusConfig');

router.get('/', jwtCheck, async (req, res, next) => {
  try {
    const teachers = await db.getAll()
    res.status(responseStatus.success).json(teachers);
  } catch (err) {
    console.log('Err', err);
    next(responseStatus.serverError)
  }
});

router.get('/:id', jwtCheck, async (req, res, next) => {
  const {id} = req.params
  try {
    const teachersClasses = await db.getTeacher(id)
    res.status(responseStatus.success).json(teachersClasses);
  } catch (err) {
    next(responseStatus.serverError)
  }
});

router.put('/:id', async (req, res, next) => {
  const {id} = req.params
  try {
    const teachersClasses = await db.updateTeacher(id)
    res.status(responseStatus.success).json(teachersClasses);
  } catch (err) {
    next(responseStatus.serverError)
  }
});



module.exports = router;
