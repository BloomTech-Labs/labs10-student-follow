const faker = require('faker');

const create = () => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  sg_recipient_id: faker.lorem.word()
});

exports.seed = async function(knex, Promise) {
  const students = [];

  for (let i = 0; i < 500; i++) {
    students.push(create());
  }

  await knex.raw('TRUNCATE TABLE students RESTART IDENTITY CASCADE');
  await knex('students').insert(students);
};
