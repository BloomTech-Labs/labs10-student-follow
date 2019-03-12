// Update with your config settings.
require('dotenv').config();
const pg = require('pg');

pg.defaults.ssl = true; // this needs to be false in development, true when using heroku db

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'refreshr',
      password: 'password',
      database: 'refreshr_dev'
    },
    migrations: {
      directory: './server/data/migrations/test'
    },
    seeds: {
      directory: './server/data/seeds/test'
    },
    useNullAsDefault: true
  },

  testing: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'refreshr',
      database: 'refreshr_test'
    },
    migrations: {
      directory: './server/data/migrations/test'
    },
    seeds: {
      directory: './server/data/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './server/data/migrations/production'
    },
    seeds: {
      directory: './server/data/seeds/production'
    }
  }
};
