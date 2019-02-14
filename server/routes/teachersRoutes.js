const express = require('express');

const router = express.Router();
const responseStatus = require('./responseStatus');

router.get('/', async (req, res) => {
  try {
    const teachers = await db('teachers');
    res.status(responseStatus.success).json(teachers);
  } catch (err) {
    res.status(responseStatus.serverError).json('Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const ids = await db('teachers').insert(req.body);
    res.status(responseStatus.postCreated).json(`Added new log with ID ${ids}`);
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

router.get('/classes', async (req, res) => {
  try {
    const teachersClasses = await db('classes_teachers');
    res.status(responseStatus.success).json(teachersClasses);
  } catch (err) {
    res.status(responseStatus.serverError).json('Error');
  }
});

router.post('/classes', async (req, res) => {
  try {
    const ids = await db('classes_teachers').insert(req.body);
    res.status(responseStatus.postCreated).json(`Added new log with ID ${ids}`);
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
