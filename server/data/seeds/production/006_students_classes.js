const faker = require('faker');

const create = () => ({
    student_id: Math.ceil(Math.random() * 500),
    class_id: Math.ceil(Math.random() * 500),
  })

exports.seed = async function(knex, Promise) {
  const students_classes = [];
  
  for (let i = 0; i < 500; i++) {
    students_classes.push(create())
  }
  
    await knex.raw('TRUNCATE TABLE students_classes RESTART IDENTITY CASCADE')
    await knex('students_classes').insert(students_classes)
  };
  
