const faker = require('faker');

const create = () => ({
  question: faker.lorem.sentence(10),
  answer_1: faker.lorem.sentence(5),
  answer_2: faker.lorem.sentence(5),
  answer_3: faker.lorem.sentence(5),
  answer_4: faker.lorem.sentence(5)
});

exports.seed = async function(knex, Promise) {
  const questions = [];

  for (let i = 0; i < 100; i++) {
    questions.push(create());
  }

  await knex.raw('TRUNCATE TABLE questions RESTART IDENTITY CASCADE');
  await knex('questions').insert(questions);
};
