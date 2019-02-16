const db = require('../../config/dbConfig');

module.exports = {
  getAll: async () => {
    const allQuestions = await db('questions');

    return allQuestions;
  },

  getQuestion: async (id) => {
    const selectedQuestion = await db('questions')
      .where({ id })
      .first();

    return selectedQuestion;
  },
  addQuestion: async (question) => {
    const ID = await db('questions').insert(question);

    return { newQuestionID: ID[0] };
  },

  updateQuestion: async (id, question) => {
    const updateCount = await db('questions')
      .where({ id })
      .update(question);
    return updateCount;
  },

  deleteQuestion: async (id) => {
    const deleteCount = await db('questions')
      .where({ id })
      .del();
    return deleteCount;
  }
};
