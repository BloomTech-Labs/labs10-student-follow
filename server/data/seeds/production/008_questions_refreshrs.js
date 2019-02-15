const faker = require('faker');

const create = () => ({
    question_id: Math.ceil(Math.random() * 100),
    refreshr_id: Math.ceil(Math.random() * 100),
  })

exports.seed = async function(knex, Promise) {
  const questions_refreshrs = [];
  
  for (let i = 0; i < 100; i++) {
    questions_refreshrs.push(create())
  }
  
    await knex.raw('TRUNCATE TABLE questions_refreshrs RESTART IDENTITY CASCADE')
    await knex('questions_refreshrs').insert(questions_refreshrs)
  };
  
