const express = require('express');
const stripe = require('stripe')("sk_test_WjgLJcjcHXfmcGedEp7NrXRi");

const router = express.Router();

router.get('/', (req, res) => {
  res.send('billing sanity check');
});

router.post('/charge', async (req, res) => {
  console.log('req', req.body);
  
  try {
    let {status} = await stripe.charges.create({
      amount: req.body.subType === 'monthly' ? 999 : 2999,
      currency: 'usd',
      description: 'test stripe charge',
      source: req.body.token
    });
    console.log('status', status);
    

    res.json({status});
  } catch(err) {
    console.log(err);
    
    res.status(500).json({ error: `there was an error processing the payment: ${err}` })
  }

})

module.exports = router;
