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
  if (!user) {
    return res.send('User not found.');
  }
  try {
    const customer = await stripe.customers.create({
      email: user.token.email,
      source: user.token.id,
      plan: 'plan_EYov3cCBWtLgXV'
    });
    console.log('customer', customer);
    res.status(200).send(customer);
  } catch (error) {
    console.log('ERR', error);
  }
});

// router.post('/charge', async (req, res) => {
//   const user = req.body;
//   console.log('USER', user.token.email);
//   try {
//     // let { status } = await stripe.charges.create({
//     //   amount: req.body.subType,
//     //   currency: 'usd',
//     //   description: 'test stripe charge',
//     //   email: user.email,
//     //   statement_descriptor: 'Refreshr Payment',
//     //   source: user.token.id
//     // });
//     // res.json({ status });

//     const customerResponse = stripe.customers.create(
//       {
//         description: 'Customer for testing source',
//         source: 'tok_visa', // obtained with Stripe.js
//         // email: user.token.email
//         email: 'nickoferrall@gmail.com'
//       },
//       function(err, customer) {
//         // asynchronously called
//         // console.log('CUSTOMER', customer);
//         console.log('ERR from customer create', err);
//         console.log('CUSTOMER', customer);
//         return customer;
//       }
//     );

//     console.log('customerResponse', customerResponse.id);

//     // console.log('user.token.card', user.token.card);
//     // stripe.customers.createSource(
//     //   'cus_EYn0mQnCLmD55u',
//     //   // { source: 'tok_amex', description: 'Customer for testing source' },
//     //   { source: 'tok_visa', description: 'Customer for testing source' },
//     //   // { source: user.token.card },
//     //   function(err, card) {
//     //     // asynchronously called
//     //     console.log('ERR from card', err);
//     //     console.log('CARD', card);
//     //   }
//     // );

//     // console.log('USER', user.token.type);
//     const source = stripe.sources.create(
//       {
//         // type: user.token.type,
//         // card: user.token.card,
//         // currency: 'usd',
//         // owner: {
//         //   email: user.token.email
//         // }
//         type: 'ach_credit_transfer',
//         // type: 'card',
//         // type: user.token.type,
//         currency: 'usd',
//         owner: {
//           email: user.token.email
//         }
//       },
//       function(err, source) {
//         console.log('ERR', err);
//         console.log('WITHIN SOURCE', source);
//         return source;
//         // asynchronously called
//         // console.log('SOURCY', source.owner.email);

//         // const customer = stripe.customers.create({
//         //   email: source.owner.email,
//         //   source: source.id
//         // });
//         // console.log('CUSTOMER', customer);
//       }
//     );
//     console.log('SOURCE', source);

//     const sub = stripe.subscriptions.create(
//       {
//         // customer: 'cus_ETpOayu8argnJO',
//         // customer: 'cus_EYn0mQnCLmD55u', // nick oferrall
//         customer: 'cus_EZ6uEVxAW2osMf', // another Nick
//         // customer: customerResponse.id,

//         // amount: user.subType,
//         // currency: 'usd',
//         // description: 'test stripe charge',
//         // email: user.card.email,
//         // statement_descriptor: 'Refreshr Payment',
//         // source: user.id,
//         items: [
//           {
//             // plan: 'ruby-infinite-345'
//             // plan: 'prod_EYoWV6h9SKDkgV'
//             // plan: 'plan_EYos5GzTTJb0w0'
//             plan: 'plan_EYov3cCBWtLgXV'
//           }
//         ]
//       },
//       function(err, subscription) {
//         // asynchronously called
//         console.log('SUBSCRIPTION', subscription);
//         console.log('ERR FROM SUBSCRIPTION', err);
//         return subscription;
//       }
//     );
//     console.log('SUB', sub);
//     res.json({ sub });
//   } catch (err) {
//     console.log('ERROR', err);
//   }
// });

module.exports = router;
