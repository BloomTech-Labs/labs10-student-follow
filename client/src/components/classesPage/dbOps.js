import { getContacts } from '../SendgridOps';
import axios from 'axios';

const token = localStorage.getItem('accessToken');
const ax = axios.create({
  // baseURL: 'https://refreshr.herokuapp.com' // production
  baseURL: 'http://localhost:9000',
  headers: {
    authorization: `Bearer ${token}`
  } // development
});

// dummy data
// const listData = {
//   name: 'some new class'
// };

/* 
const recipientData = [
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
];
*/
// const campaignData = {
// id: 23 // refreshr id
// listId: 42 // the sendgrid list id for updating
// };

/* basic flow of sending data to back end:

  1) add the new class to the classes table. save the returned id
  2) add the new students to the students table. save the returned id's in an array
  3) add the new class and the new students to the students_classes table using variables saved in steps 1 and 2
  4) add the refreshr, class, and teacher to the teachers_classes_refreshrs table using the refreshr id, teacher(user) id, and class id from step 1
*/

// submitClassData(listData, validated.list_ids[0], )

// const listData = { classnameInput: 'afafadsfsdfqwef', ccBool: false };
// const sg_list_id = 7201393;

const submitClassData = async (
  listData,
  sg_list_id,
  recipientData,
  campaignData
) => {
  try {
    console.log('listData:', listData);
    console.log('sg_list_id:', sg_list_id);
    console.log('recipientData:', recipientData);
    console.log('campaignData:', campaignData);

    // add class to classes table
    const classRes = await ax.post('/classes', {
      name: listData.classnameInput,
      sg_list_id: `${sg_list_id}`
    }); // need to add cc field to classes, leaving it out for now
    console.log(classRes);
    const { newClassID } = classRes.data;
    console.log('class id:', newClassID)

    // add students to students
    // assuming students don't exist in db for now
    const newStudents = []; // array to keep track of new students

    // get recipient id's and map to recipient email
    const sgIds = {}; // object to match emails to sg id
    const sgRecipientList = await getContacts(sg_list_id);
    console.log(sgRecipientList);
    const recipients = sgRecipientList.data.recipients;
    console.log(recipients);

    for (let r of recipients) {
      // const email = r.email;
      // const sgId = r.id;
      sgIds[r.email] = r.id;
    }
    console.log(sgIds);

    for (const recipient of recipientData) {
      
      // add each student to db
      const studentsRes = await ax.post('/students', {
        first_name: recipient.first_name,
        last_name: recipient.last_name,
        email: recipient.email,
        sg_recipient_id: sgIds[recipient.email],
      });
      console.log('students res:', studentsRes)
      // we are not accounting yet for students already in db. will have to throw an error if one is found? or just add that student to the class
      const { newStudentID } = studentsRes.data;
      newStudents.push(newStudentID); // add to array for updating students_classes table
    }

    console.log(newStudents);

    // add students and class to students_classes table
    const scRes = await ax.post(`/classes/${newClassID}`, {
      students: newStudents
    });
    console.log('response:', scRes);

    // add refreshrs to tcr TODO
    // refreshrs will already be created and so will have an id
    // add teacher(user) id, class id, and refreshr id
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

/*
const testSubmit = () => {
  return (
    <>
      <h1>test</h1>
      <button
        onClick={() =>
          submitClassData(listData, sg_list_id, recipientData, campaignData)
        }
      >
        test
      </button>
    </>
  );
};
*/

// submitClassData(listData, sg_list_id, recipientData, campaignData);
export default submitClassData;
