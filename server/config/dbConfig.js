const environment = process.env.DB_ENV || 'testing'
const knexConfig = require('../../knexfile.js')[environment];

module.exports = require('knex')(knexConfig);