const express = require('express');
const stripe = require('stripe')('sk_test_WjgLJcjcHXfmcGedEp7NrXRi'); // test key

const router = express.Router();

router.get('/', (req, res) => {
  res.send('billing sanity check');
});

router.post('/charge', async (req, res) => {
  console.log('req', req.body);

  try {
    let { status } = await stripe.charges.create({
      amount: req.body.subType === 'monthly' ? 999 : 2999, // not sure if it's better to do this here or on front end
      currency: 'usd',
      description: 'test stripe charge',
      source: req.body.token
    });

    res.json({ status });
  } catch (err) {
    res
      .status(500)
      .json({ error: `there was an error processing the payment: ${err}` });
  }
});

module.exports = router;
