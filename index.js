require('dotenv').config();
const server = require('../backend/server/api/server');
const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
