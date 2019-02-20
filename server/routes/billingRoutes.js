const express = require('express');
const stripe = require('stripe')(process.env.REACT_APP_SECRET_KEY); // secret test key in .env

const router = express.Router();

router.get('/', (req, res) => {
  res.send('billing sanity check');
});

router.post('/charge', async (req, res) => {
  const user = req.body.token;
  try {
    let { status } = await stripe.charges.create({
      amount: req.body.subType,
      currency: 'usd',
      description: 'test stripe charge',
      email: user.card.email,
      statement_descriptor: 'Refreshr Payment',
      source: user.id
    });
    res.json({ status });
  } catch (err) {
    res
      .status(500)
      .json({ error: `There was an error processing the payment: ${err}` });
  }
});

module.exports = router;
