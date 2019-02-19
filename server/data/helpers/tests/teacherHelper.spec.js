const db = require('../../../config/dbConfig.js');
const teacherHelper = require('../teacherHelper.js');

// afterAll(async (done) => {
// 	await db.raw('TRUNCATE TABLE teachers RESTART IDENTITY CASCADE').then(() => db.seed.run())
// 	done();
// });

describe('GET query to teachers db', () => {
  it('should return all 500 teachers', async (done) => {
    const allTeachers = await teacherHelper.getAll();
    expect(allTeachers).toHaveLength(500);
    done();
  });

  it('should return 1 teacher', async (done) => {
    const teacher = await teacherHelper.getTeacher(1);
    expect(Object.keys(teacher).sort()).toEqual(
      ['classes', 'email', 'firstname', 'lastname', 'id'].sort()
    );
    done();
  });
});


describe('UPDATE query to teachers db', () => {
  it('should update teacher with specified ID', async (done) => {
    teacherHelper.updateTeacher(501, {
      firstname: 'Jane',
      lastname: 'Doe',
      email: 'test@abc.com'
    });
    const updated = await teacherHelper.getTeacher(501);

    expect(updated.email).toEqual('test@abc.com');
    done();
  });
});

describe('DELETE query to teachers db', () => {
  it('should return a count of 1 when deleting specified teacher', async (done) => {
    const count = await teacherHelper.deleteTeacher(501);

    expect(count).toEqual(1);
    done();
  });
});
