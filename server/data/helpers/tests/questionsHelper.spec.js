const db = require('../../../config/dbConfig.js');
const questionsHelper = require('../questionsHelper.js');

// afterAll(async (done) => {
// 	await db
// 		.raw('TRUNCATE TABLE questions RESTART IDENTITY CASCADE')
// 		.then(() => db.seed.run());
// 	done();
// });

describe('GET query to questions db', () => {
	it('should return all questions', async (done) => {
		const allQuestions = await questionsHelper.getAll();
		expect(allQuestions).toHaveLength(100);
		done();
	});
	it('should return 1 question', async (done) => {
		const selectedQuestion = await questionsHelper.getQuestion(5);
		expect(Object.keys(selectedQuestion).sort()).toEqual(
			[
				'id',
				'review_text',
				'question',
				'wrong_answer_1',
				'wrong_answer_2',
				'wrong_answer_3',
				'correct_answer'
			].sort()
		);
		done();
	});
});

describe('INSERT query to questions db', () => {
	it('should add question to db and return the ID', async (done) => {
		const added = await questionsHelper.addQuestion({
			review_text: 'test',
			question: 'test',
			wrong_answer_1: 'test',
			wrong_answer_2: 'test',
			wrong_answer_3: 'test',
			correct_answer: 'test'
		});
		const newQuestion = await questionsHelper.getQuestion(added);

		expect(newQuestion.review_text).toEqual('test');
		done();
	});

	it('should return an object with the correct keys', async (done) => {
		const added = await questionsHelper.addQuestion({
			review_text: 'test',
			question: 'test',
			wrong_answer_1: 'test',
			wrong_answer_2: 'test',
			wrong_answer_3: 'test',
			correct_answer: 'test'
		});
		const newQuestion = await questionsHelper.getQuestion(added.newquestionID);

		expect(Object.keys(newQuestion).sort()).toEqual(
			[
				'id',
				'review_text',
				'question',
				'wrong_answer_1',
				'wrong_answer_2',
				'wrong_answer_3',
				'correct_answer'
			].sort()
		);
		done();
	});
});

describe('UPDATE query to question db', () => {
	it('should update question with specified ID', async (done) => {
		questionsHelper.updateQuestion(1, {
			review_text: 'testing',
			question: 'testing',
			wrong_answer_1: 'testing',
			wrong_answer_2: 'testing',
			wrong_answer_3: 'testing',
			correct_answer: 'testing'
		});
		const updated = await questionsHelper.getQuestion(1);

		expect(updated.review_text).toEqual('testing');
		done();
	});
});

describe('DELETE query to question db', () => {
	it('should return a count of 1 when deleting specified question', async (done) => {
		const count = await questionsHelper.deleteQuestion(30);

		expect(count).toEqual(1);
		done();
	});
});


