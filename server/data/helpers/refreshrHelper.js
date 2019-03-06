const db = require('../../config/dbConfig');

module.exports = {
  getAll: async () => {
    const allRefreshrs = await db('refreshrs');

    return allRefreshrs;
  },

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

    const teacher = await db('teachers')
      .select(
        'teachers.user_id as t_id',
        'teachers.first_name as t_first',
        'teachers.last_name as t_last',
        'teachers.email as t_email'
      )
      .join(
        'teacher_classes_refreshrs as tcr',
        'teachers.user_id',
        'tcr.teacher_id'
      )
      .join('refreshrs', 'refreshrs.id', 'tcr.refreshr_id')
      .where('refreshrs.id', id);

    return Promise.all([selectedRefreshr, questions, teacher]).then(
      response => {
        let [selectedRefreshr, questions, teacher] = response;
        let result = {
          id: selectedRefreshr.id,
          name: selectedRefreshr.name,
          review_text: selectedRefreshr.review_text,
          typeform_url: selectedRefreshr.typeform_url,
          teachers: teacher.map(t => {
            return {
              teacher_id: t.t_id,
              name: `${t.t_first} ${t.t_last}`,
              email: t.t_email
            };
          }),
          questions: questions.map(q => {
            return {
              question_id: q.question_id,
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
      }
    );
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
  },

  getTeacherRefreshrs: teacher_id => {
    return db('refreshrs')
      .where({ teacher_id })
      .join(
        'questions_refreshrs',
        'questions_refreshrs.refreshr_id',
        'refreshrs.id'
      )
      .join('questions', 'questions.id', 'questions_refreshrs.questions_id');
  }
};
