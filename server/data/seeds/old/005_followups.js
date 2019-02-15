const faker = require('faker');

const refreshrs = [];

for (let i = 0; i < 100; i++) {
  refreshrs.push({
    date: faker.date.future(),
    question: Math.ceil(Math.random() * 100),
  })
}

exports.seed = async function(knex, Promise) {
  await knex.raw('truncate table refreshrs restart identity cascade');
  await knex('refreshrs').insert(refreshrs);
};
