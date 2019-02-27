const axios = require('axios');

const ax = axios.create({
  // baseURL: 'https://refreshr.herokuapp.com' // production
  baseURL: 'http://localhost:9000' // development
});

// dummy data
const listData = {
  name: 'some new class'
};

const recipientData = {
  recipients: [
    {
      first_name: 'bob',
      last_name: 'green',
      email: 'bob@green'
    },
    {
      first_name: 'charlie',
      last_name: 'hunter',
      email: 'charlie@hunter'
    },
    {
      first_name: 'bobby',
      last_name: 'orr',
      email: 'bobby@bruins'
    },
    {
      first_name: 'ted',
      last_name: 'williams',
      email: 'ted@bosox'
    }
  ]
};

const campaignData = {
  id: 23 // refreshr id
  // listId: 42 // the sendgrid list id for updating
};

/* basic flow of sending data to back end:

  1) add the new class to the classes table. save the returned id
  2) add the new students to the students table. save the returned id's in an array
  3) add the new class and the new students to the students_classes table using variables saved in steps 1 and 2
  4) add the refreshr, class, and teacher to the teachers_classes_refreshrs table using the refreshr id, teacher(user) id, and class id from step 1
*/

const submitClassData = async (listData, recipientData, campaignData) => {
  try {
    // add class to classes table
    const classRes = await ax.post('/classes', {
      name: listData.name
    }); // need to add cc field to classes, leaving it out for now
    const { newClassID } = classRes.data;

    // add students to students
    // assuming students don't exist in db for now
    const newStudents = []; // array to keep track of new students

    for (const recipient of recipientData.recipients) {
      // add each student to db
      // should probably change these column names on back or front end so they're consistent
      const studentsRes = await ax.post('/students', {
        firstname: recipient.first_name,
        lastname: recipient.last_name,
        email: recipient.email
      });
      // we are not accounting yet for students already in db. will have to throw an error if one is found? or just add that student to the class
      const { newStudentID } = studentsRes.data;
      newStudents.push(newStudentID); // add to array for updating students_classes table
    }
    // add students and class to students_classes table
    const scRes = await ax.post(`/classes/${newClassID}`, {
      students: newStudents
    });
    console.log('response:', scRes);

    // add refreshrs to tcr
    // refreshrs will already be created and so will have an id
    // add teacher(user) id, class id, and refreshr id
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

export default submitClassData;