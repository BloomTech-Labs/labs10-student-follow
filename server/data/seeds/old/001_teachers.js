const faker = require('faker');

const teachers = [];

for (let i = 0; i < 500; i++) {
  teachers.push({
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'pass', // should encrypt after we add bcrypt
  })
}

exports.seed = async function(knex, Promise) {
  await knex.raw('truncate table teachers restart identity cascade')
  await knex('teachers').insert(teachers);
};
