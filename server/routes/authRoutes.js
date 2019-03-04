const express = require('express');
const router = express.Router();
const management = require('../authentication')


//Returns all users on Auth0
router.get('/users', async (req, res, next) => {
  try {
    const users = await management.getUsers()
    //console.log(users)
    res.status(200).json({ users });
  } catch (err) {
    res.status(500)
    next(err);
  }
});

//Returns all Rules

router.get('/rules', async (req, res, next) => {
  try {
    const rules = await management.getRules()
   // console.log(rules)
    res.status(200).json({ rules });
  } catch (err) {
    res.status(500)
    next(err);
  }
});



module.exports= router


