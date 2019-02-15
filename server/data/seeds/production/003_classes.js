const faker = require('faker');

const create = () => ({
	name: faker.hacker.ingverb()
});

exports.seed = async function(knex, Promise) {
	const classes = [];

	for (let i = 0; i < 500; i++) {
		classes.push(create());
	}

	await knex.raw('TRUNCATE TABLE classes RESTART IDENTITY CASCADE');
	await knex('classes').insert(classes);
};
