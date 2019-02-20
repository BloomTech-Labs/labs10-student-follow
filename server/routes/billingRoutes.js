const express = require('express');
const stripe = require('stripe')(process.env.SECRET_KEY); // secret test key in .env
const responseStatus = require('../config/responseStatusConfig');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('billing sanity check');
});

const standardPlan = 999;

router.post('/charge', async (req, res) => {
  const user = req.body;
  if (!user) {
    return res.send('User not found.');
  }
  try {
    const customer = await stripe.customers.create({
      email: user.token.email,
      source: user.token.id,
      plan:
        user.subType === standardPlan
          ? process.env.PLAN_ID_ONE
          : process.env.PLAN_ID_TWO
    });
    res.status(responseStatus.postCreated).send(customer);
  } catch (error) {
    next(err);
  }
});

module.exports = router;
