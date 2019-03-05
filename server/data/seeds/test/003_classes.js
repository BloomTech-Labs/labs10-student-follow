const faker = require('faker');

const create = (id) => ({
  name: faker.hacker.ingverb(),
  sg_list_id: id
});

exports.seed = async function(knex, Promise) {
  const classes = [];

  for (let i = 1; i < 501; i++) {
    classes.push(create(i));
  }

  await knex.raw('TRUNCATE TABLE classes RESTART IDENTITY CASCADE');
  await knex('classes').insert(classes);
};
