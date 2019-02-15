
const faker = require('faker');

const classes_teachers = [];
const t_ids = [];
const c_ids = [];

for (let i = 1; i < 401; i++) {
  t_ids.push(i);
  c_ids.push(i);
}

for (let i = 0; i < 400; i++) {
  const [class_id] = [...c_ids.splice(Math.floor(Math.random() * c_ids.length), 1)];
  const [ teacher_id ] = [...t_ids.splice(Math.floor(Math.random() * t_ids.length), 1)];
  classes_teachers.push({
    class_id: class_id,
    teacher_id: teacher_id, 
    refreshr_1: Math.ceil(Math.random() * 100),
    refreshr_2: Math.ceil(Math.random() * 100),
    refreshr_3: Math.ceil(Math.random() * 100),
  })
  
}

exports.seed = async function(knex, Promise) {
  await knex.raw('truncate table classes_teachers restart identity cascade');
  await knex('classes_teachers').insert(classes_teachers);
};
