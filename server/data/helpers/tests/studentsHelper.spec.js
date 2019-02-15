const db = require('../../../config/dbConfig.js');
const studentsHelper = require('../studentsHelper.js');



describe('GET query to students db', () => {
	it('should return all 500 students', async (done) => {
		const allStudents = await studentsHelper.getAll();
		expect(allStudents).toHaveLength(500);
		done();

	});

	it('should return 1 student', async (done) => {
		const students = await studentsHelper.getStudent(1);
		expect(Object.keys(students).sort()).toEqual(['classes', 'email', 'firstname', 'lastname', 'id'].sort())
		done();

	});
});

describe('UPDATE query to students db', () => {
	it('should update student with specified ID', async (done) => {
		studentsHelper.updateStudent(1, {
			firstname: 'Jane',
			lastname: 'Doe',
			email: 'jdoe@abc.com'
		});
		const updated = await studentsHelper.getStudent(1);

		expect(updated.email).toEqual('jdoe@abc.com');
		done();

	});
});

describe('DELETE query to students db', () => {
	it('should return a count of 1 when deleting specified student', async (done) => {
		const count = await studentsHelper.deleteStudent(500);

		expect(count).toEqual(1);
		done();

	});
});

afterAll(async (done) => {
	await db.raw('TRUNCATE TABLE students RESTART IDENTITY CASCADE').then(() => db.seed.run())
	done();
});