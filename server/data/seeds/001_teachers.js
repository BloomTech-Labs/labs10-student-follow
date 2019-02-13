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

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('teachers').delete() // one annoying thing about postgres is we can't seem to truncate, have to delete :(
    .then(function () {
      // Inserts seed entries
      return knex('teachers').insert(teachers);
    });
};
