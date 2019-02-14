const db = require('../../config/dbConfig')
const teacherHelper = require('./teacherHelper')

afterEach(async () => {
    await db('teachers').truncate();
})