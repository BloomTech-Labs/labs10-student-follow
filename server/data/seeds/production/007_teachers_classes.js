const faker = require('faker');

const create = () => ({
    teacher_id: Math.ceil(Math.random() * 500),
    class_id: Math.ceil(Math.random() * 500),
  })

exports.seed = async function(knex, Promise) {
  const teachers_classes = [];
  
  for (let i = 0; i < 500; i++) {
    teachers_classes.push(create())
  }
  
    await knex.raw('TRUNCATE TABLE teachers_classes RESTART IDENTITY CASCADE')
    await knex('teachers_classes').insert(teachers_classes)
  };
  
