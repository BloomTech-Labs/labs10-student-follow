const faker = require('faker');

const students_classes = [];
const s_ids = [];
const c_ids = [];

for (let i = 1; i < 101; i++) {
  s_ids.push(i);
  c_ids.push(i);
}

for (let i = 0; i < 100; i++) {
  const [class_id] = [...c_ids.splice(Math.floor(Math.random() * c_ids.length), 1)];
  const [ student_id ] = [...s_ids.splice(Math.floor(Math.random() * s_ids.length), 1)];
  students_classes.push({
    class_id: class_id,
    student_id: student_id 
  })
  
}

exports.seed = async function(knex, Promise) {
  await knex.raw('truncate table students_classes restart identity cascade');
  await knex('students_classes').insert(students_classes);
};
