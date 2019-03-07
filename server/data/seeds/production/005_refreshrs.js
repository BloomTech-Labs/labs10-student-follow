const faker = require('faker');

const create = id => ({
  review_text: faker.lorem.sentence(20),
  name: faker.random.words(2),
  typeform_url: `www.typeform.com`,
  typeform_id: id
});

exports.seed = async function(knex, Promise) {
  const refreshrs = [];

  for (let i = 1; i < 101; i++) {
    refreshrs.push(create(i));
  }

  await knex.raw('TRUNCATE TABLE refreshrs RESTART IDENTITY CASCADE');
  await knex('refreshrs').insert(refreshrs);
};
