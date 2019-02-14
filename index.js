require('dotenv').config();

const server = require('./server/api/server');

const PORT = process.env.PORT || 9000;

// server.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

////

// server.use(jwtCheck);

const authenticate = require('./server/middleware/authenticate');

server.get('/authorized', async (req, res) => {
  try {
    res.send('Secured Resource');
  } catch (error) {
    res.status(500).json(console.log('Err', error));
  }
});

server.get('/elon', authenticate, async (req, res) => {
  try {
    res.send('Funding secured');
  } catch (error) {
    res.status(500).json(error);
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
