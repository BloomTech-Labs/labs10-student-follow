const faker = require('faker');

const create = (id) => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  role: 'teacher',
  user_id:  id,
});

exports.seed = async function(knex, Promise) {
  const teachers = [];

  for (let i = 1; i < 501; i++) {
    teachers.push(create(i));
  }

  await knex.raw('TRUNCATE TABLE teachers RESTART IDENTITY CASCADE');
  await knex('teachers').insert(teachers);
};
