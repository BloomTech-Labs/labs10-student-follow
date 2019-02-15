const faker = require('faker');

const classes = [];

for (let i = 0; i < 500; i++) {
  classes.push({
    name: faker.hacker.ingverb(),
  })
}
exports.seed = async function(knex, Promise) {
  await knex.raw('truncate table classes restart identity cascade');
  await knex('classes').insert(classes);
};
