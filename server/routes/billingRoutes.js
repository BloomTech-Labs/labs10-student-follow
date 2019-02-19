const express = require('express');
const stripe = require('stripe')(process.env.SECRET_KEY); // secret test key in .env

const router = express.Router();

router.get('/', (req, res) => {
  res.send('billing sanity check');
});

router.post('/charge', async (req, res) => {
  const user = req.body;
  console.log('USER', user.token.id);
  try {
    // let { status } = await stripe.charges.create({
    //   amount: req.body.subType,
    //   currency: 'usd',
    //   description: 'test stripe charge',
    //   email: user.email,
    //   statement_descriptor: 'Refreshr Payment',
    //   source: user.token.id
    // });
    // res.json({ status });

    const product = stripe.products.create({
      name: 'Monthly Subscription',
      type: 'service'
    });

    const plan = stripe.plans.create({
      currency: 'usd',
      interval: 'month',
      product: 'prod_EYoWV6h9SKDkgV',
      nickname: 'Monthly Plan',
      amount: 999 // cents
    });

    console.log('PLAN', plan);

    const sub = stripe.subscriptions.create(
      {
        // customer: 'cus_ETpOayu8argnJO',
        customer: 'cus_EYn0mQnCLmD55u', // nick oferrall
        // amount: user.subType,
        // currency: 'usd',
        // description: 'test stripe charge',
        // // email: user.card.email,
        // statement_descriptor: 'Refreshr Payment',
        // source: user.id,
        items: [
          {
            plan: 'ruby-infinite-345'
            // plan: 'prod_EYoWV6h9SKDkgV'
          }
        ]
      },
      function(err, subscription) {
        // asynchronously called
      }
    );
    // console.log('SUB', sub);
    res.json({ sub });
  } catch (err) {
    console.log('ERROR', err);
    // res
    //   .status(500)
    //   .json({ error: `There was an error processing the payment: ${err}` });
  }
});

module.exports = router;
