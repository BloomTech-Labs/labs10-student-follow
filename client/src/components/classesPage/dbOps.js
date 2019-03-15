import { getContacts } from './SendgridOps';
import axios from 'axios';

const token = localStorage.getItem('accessToken');
const ax = axios.create({
  // PRODUCTION
  baseURL: 'https://refreshr.herokuapp.com',
  // DEVELOPMENT
  //baseURL: 'http://localhost:9000',
  headers: {
    authorization: `Bearer ${token}` // development
  }
});

const user_id = localStorage.getItem('user_id');
console.log('uid:', user_id);
/* basic flow of sending data to back end:

  1) add the new class to the classes table. save the returned id
  2) add the new students to the students table. save the returned id's in an array
  3) add the new class and the new students to the students_classes table using variables saved in steps 1 and 2
  4) add the refreshr, class, and teacher to the teachers_classes_refreshrs table using the refreshr id, teacher(user) id, and class id from step 1
*/

const submitClassData = async (
  listData,
  sg_list_id,
  recipientData,
  campaignData
) => {
  try {
    console.log(campaignData);

    // add class to classes table
    const classRes = await ax.post('/classes', {
      name: listData.classnameInput,
      sg_list_id: `${sg_list_id}`
    }); // need to add cc field to classes, leaving it out for now
    const { newClassID } = classRes.data;

    // add students to students
    // assuming students don't exist in db for now
    const newStudents = []; // array to keep track of new students

    // get recipient id's and map to recipient email
    const sgIds = {}; // object to match emails to sg id
    const sgRecipientList = await getContacts(sg_list_id);
    const recipients = sgRecipientList.data.recipients;

    for (let r of recipients) {
      sgIds[r.email] = r.id;
    }

    for (const recipient of recipientData) {
      // add each student to db
      const studentsRes = await ax.post('/students', {
        first_name: recipient.first_name,
        last_name: recipient.last_name,
        email: recipient.email,
        sg_recipient_id: sgIds[recipient.email]
      });
      // we are not accounting yet for students already in db. will have to throw an error if one is found? or just add that student to the class
      const { newStudentID } = studentsRes.data;
      newStudents.push(newStudentID); // add to array for updating students_classes table
    }

    // add students and class to students_classes table
    for (let student of newStudents) {
      const scRes = await ax.post(`/classes/${newClassID}/students`, {
        student_id: student
      });
    }

    // add refreshr to tcr
    const newCampaign = {
      teacher_id: user_id,
      refreshr_id: campaignData.refreshr_id,
      date: campaignData.date,
      sg_campaign_id: campaignData.campaign_id
    };
    const refRes = await ax.post(`/classes/${newClassID}/campaigns`, {
      campaign: newCampaign
    });
    console.log(refRes);
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

export default submitClassData;
