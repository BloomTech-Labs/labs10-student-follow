const db = require('../../../config/dbConfig.js');
const classesHelper = require('../classesHelper.js');

afterAll(async () => {
	await db.raw('TRUNCATE TABLE classes RESTART IDENTITY CASCADE');
});

describe('GET query to classes db', () => {
	it('should return all 500 classes', async () => {
		const allClasses = await classesHelper.getAll();
		expect(allClasses).toHaveLength(500);
	});
	it('should return 1 class', async () => {
		const selectedClass = await classesHelper.getClass(1);
		expect(Object.keys(selectedClass).sort()).toEqual(
			['id', 'teacher', 'name', 'students', 'refreshrs'].sort()
		);
	});
});

describe('INSERT query to classes db', () => {
	it('should add class to db and return the ID', async () => {
		const added = await classesHelper.addClass({
			name: 'Chemistry'
		});
		const newClass = await classesHelper.getClass(added);

		expect(newClass.name).toEqual('Chemistry');
	});

	it('should return an object with the correct keys', async () => {
		const added = await classesHelper.addClass({
			name: 'Chemistry'
		});
		const newClass = await classesHelper.getClass(added.newClassID);

		expect(Object.keys(newClass).sort()).toEqual(
			['id', 'teacher', 'name', 'students', 'refreshers'].sort()
		);
	});
});

describe('UPDATE query to class db', () => {
	it('should update class with specified ID', async () => {
		classesHelper.updateClass(50, {
			name: 'Biology'
		});
		const updated = await classesHelper.getClass(50);

		expect(updated.name).toEqual('Biology');
	});
});

describe('DELETE query to classs db', () => {
	it('should return a count of 1 when deleting specified class', async () => {
		const count = await classesHelper.deleteClass(500);

		expect(count).toEqual(1);
	});
});
