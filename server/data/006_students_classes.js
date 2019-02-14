const faker = require('faker');

const students_classes = [];
const s_ids = [];
const c_ids = [];

for (let i = 0; i < 100; i++) {
  s_ids.push(i);
  c_ids.push(i);
}

for (let i = 0; i < 100; i++) {
  students_classes.push({
    class_id: c_ids.pop(Math.floor(Math.random() * c_ids.length)),
    student_id: s_ids.pop(Math.floor(Math.random() * s_ids.length)), 
  })
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students_classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('students_classes').insert(students_classes);
    });
};
