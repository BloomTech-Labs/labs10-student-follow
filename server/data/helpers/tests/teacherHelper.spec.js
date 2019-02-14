const db = require('../../../config/dbConfig.js');
const teacherHelper = require('../teacherHelper.js');

afterEach(async () => {
	await db('teachers').truncate();
});

describe('GET query to teachers db', () => {
	it('should return all 500 teachers', async () => {
		const allTeachers = await teacherHelper.getTeachers();
		expect(allTeachers).toHaveLength(500);
	});

	it('should return 1 teacher', async () => {
		const teacher = await teacherHelper.getTeachers(1);
		expect(teacher).toHaveLength(1);
	});
});

describe('UPDATE query to teachers db', () => {
	it('should update teacher with specified ID', async () => {
		teacherHelper.updateTeacher(1, {
			firstname: 'Jane',
			lastname: 'Doe',
			email: 'jdoe@abc.com'
		});
		const updated = await teacherHelper.getTeachers(1);

		expect(updated.email).toEqual('jdoe@abc.com');
	});
});

describe('DELETE query to teachers db', () => {
	it('should return a count of 1 when deleting specified teacher', async () => {
		const count = await teacherHelper.deleteTeacher(500);

		expect(count).toEqual(1);
	});
});
