import axios from 'axios';

const ax = axios.create({
    // baseURL: 'https://refreshr.herokuapp.com' // production
    baseURL: 'http://localhost:9000' // development
  });

const submitClassData = async (listData, recipientData, campaignData ) => {
    try {
      // add class to classes table
      const classRes = await ax.post('/classes', {
        name: listData.name
      }); // need to add cc field to classes, leaving it out for now
      const { newClassID } = classRes.data;

      // add students to students and students_classes
      // assuming students don't exist in db for now
      const newStudents = []; // save as array to add to students_classes table

      for (const recipient of recipientData.recipients) {
        // should probably change these column names on back or front end so they're consistent
        const studentsRes = await ax.post('/students', {
          firstname: recipient.first_name,
          lastname: recipient.last_name,
          email: recipient.email
        });
        // we are not accounting yet for students already in db. will have to throw an error if one is found? or just add that student to the class
        const { newStudentID } = studentsRes.data;
        console.log('sid', newStudentID);
        newStudents.push(newStudentID);
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