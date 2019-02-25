const faker = require('faker');

const create = () => ({
  teacher_id: Math.ceil(Math.random() * 500),
  class_id: Math.ceil(Math.random() * 500),
  refreshr_id: Math.ceil(Math.random() * 100),
  date: faker.date.future()
})

const tcr=[];
for (let i = 0; i < 100; i++) {
  tcr.push(create());
}
exports.seed = async function(knex, Promise) {
  await knex.raw('TRUNCATE TABLE teachers_classes_refreshrs RESTART IDENTITY CASCADE')
  await knex('teachers_classes_refreshrs').insert(tcr)
};
