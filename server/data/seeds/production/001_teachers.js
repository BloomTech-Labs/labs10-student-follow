const faker = require('faker');

const create = () => ({
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  password: 'pass' // should encrypt after we add bcrypt
});

exports.seed = async function(knex, Promise) {
  const teachers = [];

  for (let i = 0; i < 500; i++) {
    teachers.push(create());
  }

  await knex.raw('TRUNCATE TABLE teachers RESTART IDENTITY CASCADE');
  await knex('teachers').insert(teachers);
};
