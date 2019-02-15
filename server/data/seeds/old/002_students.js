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

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert(students);
    });
};
