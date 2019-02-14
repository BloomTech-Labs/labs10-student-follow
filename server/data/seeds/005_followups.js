const faker = require('faker');

const followups = [];

for (let i = 0; i < 100; i++) {
  followups.push({
    date: faker.date.future(),
    question: Math.floor(Math.random() * 100),
  })
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('followups').del()
    .then(function () {
      // Inserts seed entries
      return knex('followups').insert(followups);
    });
};
