const faker = require('faker');

const classes = [];

for (let i = 0; i < 500; i++) {
  classes.push({
    name: faker.hacker.ingverb(),
  })
}
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert(classes);
    });
};
