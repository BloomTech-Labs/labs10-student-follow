const db = require('../../config/dbConfig');

module.exports = {
  /*CALLS TO REFRESHRS TABLE */
  getAll: async () => {
    const allRefreshrs = await db('refreshrs');

    return allRefreshrs;
  },

  getRefreshr: async id => {
    const selectedRefreshr = await db('refreshrs')
      .where('typeform_id', id)
      .first();

    const questions = await db('questions')
      .join(
        'questions_refreshrs',
        'questions.id',
        'questions_refreshrs.question_id'
      )
      .join('refreshrs', 'refreshrs.typeform_id', 'questions_refreshrs.refreshr_id')
      .where('refreshrs.typeform_id', id);

    const teacher = await db('teachers')
      .select(
        'teachers.user_id as t_id',
        'teachers.first_name as t_first',
        'teachers.last_name as t_last',
        'teachers.email as t_email'
      )
      .join(
        'teachers_classes_refreshrs as tcr',
        'teachers.user_id',
        'tcr.teacher_id'
      )
      .join('refreshrs', 'refreshrs.typeform_id', 'tcr.refreshr_id')
      .where('refreshrs.typeform_id', id);

    return Promise.all([selectedRefreshr, questions, teacher]).then(
      response => {
        let [selectedRefreshr, questions, teacher] = response;
        let result = {
          typeform_id: selectedRefreshr.typeform_id,
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
                answer_1: q.answer_1,
                answer_2: q.answer_2,
                answer_3: q.answer_3,
                answer_4: q.answer_4
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
      .returning('typeform_id')
      .then(id => {
        return id;
      });
    return newRefreshr[0];
  },

  updateRefreshr: async (id, refreshr) => {
    const updateCount = await db('refreshrs')
    .where('typeform_id', id)
    .update(refreshr);
    return updateCount;
  },

  deleteRefreshr: async id => {
    const deleteCount = await db('refreshrs')
    .where('typeform_id', id)
    .del();
    return deleteCount;
  },



 /* CALLS TO QUESTIONS_REFRESHRS */
 
 //Connects question to refreshr
  addQuestions: async (refreshr_id, question_id) => {
    //console.log(refreshr_id, question_id)
    const results = await db('questions_refreshrs')
    .returning(['refreshr_id', 'question_id'])
    .insert({refreshr_id, question_id})
      
      return results
  },

  //removes connection between refreshr and question
  removeQuestion: (refreshr_id, question_id) => {
    return db('questions_refreshrs')
      .where({refreshr_id, question_id})
      .delete();

  }
};
