const db = require('../../config/dbConfig');

module.exports = {
  getAll: async () => {
    const allRefreshrs = await db('refreshrs');

    return allRefreshrs;
  },
  getClassRefreshrs: async class_id => db('refreshrs').where({ class_id }),

  getRefreshr: async id => {
    const selectedRefreshr = await db('refreshrs')
      .where({ id })
      .first();

    const questions = await db('questions')
      .join(
        'questions_refreshrs',
        'questions.id',
        'questions_refreshrs.question_id'
      )
      .join('refreshrs', 'refreshrs.id', 'questions_refreshrs.refreshr_id')
      .where('refreshrs.id', id);

    return Promise.all([selectedRefreshr, questions]).then(response => {
      let [selectedRefreshr, questions] = response;
      let result = {
        id: selectedRefreshr.id,
        date: selectedRefreshr.date,
        refreshrs: questions.map(q => {
          return {
            question_id: q.question_id,
            review_text: q.review_text,
            question: {
              question_text: q.question,
              wrong_answer_1: q.wrong_answer_1,
              wrong_answer_2: q.wrong_answer_2,
              wrong_answer_3: q.wrong_answer_3,
              correct_answer: q.correct_answer
            }
          };
        })
      };
      return result;
    });
  },
  addRefreshr: async refreshr => {
    const newRefreshr = await db('refreshrs')
      .insert(refreshr)
      .returning('id')
      .then(id => {
        return id;
      });
    return newRefreshr[0];
  },

  updateRefreshr: async (id, refreshr) => {
    const updateCount = await db('refreshrs')
      .where({ id })
      .update(refreshr);
    return updateCount;
  },

  deleteRefreshr: async id => {
    const deleteCount = await db('refreshrs')
      .where({ id })
      .del();
    return deleteCount;
  }
};
