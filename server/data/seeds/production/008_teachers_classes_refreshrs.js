const faker = require('faker');

const create = (id) => ({
  teacher_id: Math.ceil(Math.random() * 500),
  class_id: Math.ceil(Math.random() * 500),
  refreshr_id: Math.ceil(Math.random() * 100),
  date: faker.date.future(),
  sg_campaign_id: id
});

const tcr = [];
for (let i = 1; i < 101; i++) {
  tcr.push(create(i));
}
exports.seed = async function(knex, Promise) {
  await knex.raw(
    'TRUNCATE TABLE teachers_classes_refreshrs RESTART IDENTITY CASCADE'
  );
  await knex('teachers_classes_refreshrs').insert(tcr);
};
