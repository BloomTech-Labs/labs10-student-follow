const faker = require('faker');

const create = () => ({
  review_text: faker.lorem.sentence(20),
  name: faker.random.words(2)
});

exports.seed = async function(knex, Promise) {
  const refreshrs = [];

  for (let i = 0; i < 100; i++) {
    refreshrs.push(create());
  }

  await knex.raw('TRUNCATE TABLE refreshrs RESTART IDENTITY CASCADE');
  await knex('refreshrs').insert(refreshrs);
};
