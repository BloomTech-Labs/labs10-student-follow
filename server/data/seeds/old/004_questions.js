const faker = require('faker');

const questions = [];
for (let i = 0; i < 100; i++) {
  questions.push({
    review_text: faker.lorem.sentence(20),
    question: faker.lorem.sentence(10),
    wrong_answer_1: faker.lorem.sentence(5),
    wrong_answer_2: faker.lorem.sentence(5),
    wrong_answer_3: faker.lorem.sentence(5),
    correct_answer: faker.lorem.sentence(5),
  })
}

exports.seed = async function(knex, Promise) {
  await knex.raw('truncate table questions restart identity cascade');
  await knex('questions').insert(questions);
};
