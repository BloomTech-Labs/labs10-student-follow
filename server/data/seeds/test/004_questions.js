const faker = require('faker');

const create = () => ({
  review_text: faker.lorem.sentence(20),
  question: faker.lorem.sentence(10),
  wrong_answer_1: faker.lorem.sentence(5),
  wrong_answer_2: faker.lorem.sentence(5),
  wrong_answer_3: faker.lorem.sentence(5),
  correct_answer: faker.lorem.sentence(5)
});

exports.seed = async function(knex, Promise) {
  const questions = [];

  for (let i = 0; i < 100; i++) {
    questions.push(create());
  }

  await knex.raw('TRUNCATE TABLE questions RESTART IDENTITY CASCADE');
  await knex('questions').insert(questions);
};
