const express = require('express');
const stripe = require('stripe')(process.env.SECRET_KEY); // secret test key in .env

const router = express.Router();

router.get('/', (req, res) => {
  res.send('billing sanity check');
});

// Below to be used for creating a custom plan:
// stripe.customers.create({
//   description: 'Customer for jenny.rosen@example.com',
//   source: "tok_visa" // obtained with Stripe.js
// }, function(err, customer) {
//   // asynchronously called
// });

// const product = stripe.products.create({
//   name: 'Monthly Subscription',
//   type: 'service'
// });

// const plan = stripe.plans.create({
//   currency: 'usd',
//   interval: 'month',
//   product: 'prod_EYoWV6h9SKDkgV',
//   nickname: 'Refreshr Monthly Plan',
//   billing: "charge_automatically",
//   quantity: 1,
//   trial_period_days: 30,
//   amount: 999 // cents
// });

router.post('/charge', async (req, res) => {
  const user = req.body;
  // console.log('USER', user);
  console.log('USER', user.token);
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

    const source = stripe.sources.create(
      {
        type: user.token.type,
        card: user.token.card,
        currency: 'usd',
        owner: {
          email: user.token.email
        }
        // type: 'ach_credit_transfer',
        // currency: 'usd',
        // owner: {
        //   email: user.token.email
        // }
      },
      function(err, source) {
        console.log('ERR', err);
        console.log('WITHIN SOURCE', source);
        // asynchronously called
        // console.log('SOURCY', source.owner.email);
        const customer = stripe.customers.create({
          // email: source.owner.email,
          source: source.id
        });
        // console.log('CUSTOMER', customer);
      }
    );
    console.log('SOURCE', source);

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
            // plan: 'ruby-infinite-345'
            // plan: 'prod_EYoWV6h9SKDkgV'
            plan: 'plan_EYos5GzTTJb0w0'
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
