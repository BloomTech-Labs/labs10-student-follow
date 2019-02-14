// Update with your config settings.
require('dotenv').config();
const pg = require('pg');

pg.defaults.ssl = true; // this needs to be false in development, true when using heroku db

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'justin',
      database: 'refreshr_dev'
    },
    migrations: {
      directory: './server/data/migrations'
    },
    seeds: {
      directory: './server/data/seeds'
    }
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/9000',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
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
      directory: './server/data/migrations'
    },
    seeds: {
      directory: './server/data/seeds'
    }
  }
};
