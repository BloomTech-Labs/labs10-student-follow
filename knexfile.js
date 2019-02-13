// Update with your config settings.
require('dotenv').config();
const pg = require('pg');
pg.defaults.ssl = true;

module.exports = {
	development: {
		client: 'pg',
		// connection: process.env.DATABASE_URL, // commenting some stuff out so i can use a test db -jl
		connection: {
			host: '127.0.0.1',
			user: 'justin',
			database: ''
		},
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		}
	},

	staging: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	},

	production: {
		client: 'postgresql',
		// connection: {
		// 	database: 'my_db',
		// 	user: 'username',
		// 	password: 'password'
		// },
		connection: process.env.DATABASE_URL,
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}
};
