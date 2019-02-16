const db = require('../../../config/dbConfig.js');
const classesHelper = require('../classesHelper.js');


// afterAll(async (done) => {
// 	await db.raw('TRUNCATE TABLE classes RESTART IDENTITY CASCADE').then(() => db.seed.run())
// 	done();
// });

describe('GET query to classes db', () => {
	it('should return all 500 classes', async (done) => {
		const allClasses = await classesHelper.getAll();
		expect(allClasses).toHaveLength(500);
		done();

	});
	it('should return 1 class', async (done) => {
		const selectedClass = await classesHelper.getClass(5);
		expect(Object.keys(selectedClass).sort()).toEqual(
			['id', 'teacher', 'name', 'students', 'refreshrs'].sort()
		);
		done();

	});
});

describe('INSERT query to classes db', () => {
	it('should add class to db and return the ID', async (done) => {
		const added = await classesHelper.addClass({
			name: 'Chemistry'
		});
		const newClass = await classesHelper.getClass(added);

		expect(newClass.name).toEqual('Chemistry');
		done();

	});

	it('should return an object with the correct keys', async (done) => {
		const added = await classesHelper.addClass({
			name: 'Chemistry'
		});
		const newClass = await classesHelper.getClass(added.newClassID);

		expect(Object.keys(newClass).sort()).toEqual(
			['id', 'teacher', 'name', 'students', 'refreshers'].sort()
		);
		done();

	});
});

describe('UPDATE query to class db', () => {
	it('should update class with specified ID', async (done) => {
		classesHelper.updateClass(50, {
			name: 'Biology'
		});
		const updated = await classesHelper.getClass(50);

		expect(updated.name).toEqual('Biology');
		done();

	});
});

describe('DELETE query to classes db', () => {
	it('should return a count of 1 when deleting specified class', async (done) => {
		const count = await classesHelper.deleteClass(30);

		expect(count).toEqual(1);
		done();

	});
});

