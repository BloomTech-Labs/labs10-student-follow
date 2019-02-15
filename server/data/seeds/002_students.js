const faker = require('faker');
console.log('students');


const students = [];

for (let i = 0; i < 500; i++) {
  students.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
  })
}

exports.seed = async function(knex, Promise) {
  await knex.raw('truncate table students restart identity cascade');
  await knex('students').insert(students);
};
