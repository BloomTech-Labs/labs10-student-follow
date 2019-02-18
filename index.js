require('dotenv').config();

const server = require('./server/api/server');

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// email example testing code snippet
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'timh1203@gmail.com',
  from: 'timh1203@refreshrapp.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
// sgMail.send(msg);