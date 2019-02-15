const faker = require('faker');

const followups = [];

for (let i = 0; i < 100; i++) {
  followups.push({
    date: faker.date.future(),
    question: Math.ceil(Math.random() * 100),
  })
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('refreshrs').del()
    .then(function () {
      // Inserts seed entries
      return knex('refreshrs').insert(followups);
    });
};
