const db = require('../config/dbConfig');

const tables = [
  'students',
  'students_classes',
  'classes',
  'classes_teachers',
  'teachers',
  'refreshrs',
  'questions',
];

const truncate = tables.map(t =>
  db.raw(`truncate table ${t} restart identity cascade`),
);
Promise.all(truncate)
  .then(db.seed.run().
    then(res => { 
      console.log(`db seeded: ${res}`);
      process.exit() }))
  .catch(() => err => console.log())
  .finally(() =>console.log('done'));
