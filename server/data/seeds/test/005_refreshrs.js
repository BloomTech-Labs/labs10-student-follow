const faker = require('faker');

const create = () => ({
  date: faker.date.future(),
  class_id: Math.ceil(Math.random() * 500)
});

exports.seed = async function(knex, Promise) {
  const refreshrs = [];

  for (let i = 0; i < 100; i++) {
    refreshrs.push(create());
  }

  await knex.raw('TRUNCATE TABLE refreshrs RESTART IDENTITY CASCADE');
  await knex('refreshrs').insert(refreshrs);
};
