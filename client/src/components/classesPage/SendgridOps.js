import axios from 'axios';

// OPERATIONS FOR SENDING DATA TO SENDGRID
// 1. List Operations (classes) - helps create lists to add recipients to
// {addList, getList, getLists, updateList, deleteList}

// 2. Recipient Operations (students) - create new recipients to add to lists
// {addRecipient, addRecipients, getRecipient, getRecipients, updateRecipient, deleteRecipient, deleteRecipients}

// 3. Selection Operations - attach recipients to specific lists
// {addContact, addContacts, getContacts, deleteContact}

// 4. Campaigns Operations (refreshrs) - send the lists, recipients, and selections to create a refreshr
// {addRefreshr, getRefreshr, getRefreshrs, updateRefreshr, deleteRefreshr, scheduleRefreshr, rescheduleRefreshr, getScheduleRefreshr, deleteScheduleRefreshr, sendTestRefreshr}

// VARIABLES
const headers = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}`
  },
  'content-type': 'application/json'
};
const listId = 7100282; // Students2
//const recipient_id = 'YXN0dXJpYXN4aUBnbWFpbC5jb20='; // Timmy
// const recipient_ids = ["YnJpYW5AbWVuZG96YS5jb20=", "am9uYXRoYW5AaXZhbi5jb20=", "anVhbkBzaWVycmEuY29t"] // Juan, Brian, Jonathan
// const sender_id = 428251 // Refreshr Team
const campaign_id = 5033203; // March Newsletter

/////////////////////
/////////////////////
// 1. LIST OPERATIONS
/////////////////////
/////////////////////
export function addList(name) {
  const url = 'https://api.sendgrid.com/v3/contactdb/lists';
  const body = { name };

  return new Promise(function (resolve, reject) {
    axios
      .post(url, body, headers)
      .then(res => {
        console.log(`===addList===`);
        resolve(res);
      })
      .catch(err => console.log(err));
  });
}

export function getList() {
  const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}`;
  axios
    .get(url, headers)
    .then(res => {
      console.log(`===getList: ${res.data.name}===`);
      console.log(res.data);
    })
    .catch(err => console.log(err));
}

export function getLists() {
  const url = 'https://api.sendgrid.com/v3/contactdb/lists';
  axios
    .get(url, headers)
    .then(res => {
      console.log(`===getLists: all===`);
      console.log(res.data.lists);
    })
    .catch(err => console.log(err));
}

export function updateList() {
  const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}`;
  const body = {
    name: 'modifiedListName'
  };
  axios
    .patch(url, body, headers)
    .then(res => {
      console.log(`===updateList: ${res.data.name}===`);
      console.log(res);
    })
    .catch(err => console.log(err));
}

export function deleteList() {
  const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}?delete_contacts=true`;
  axios
    .delete(url, headers)
    .then(res => {
      console.log(`===deleteList: ${res.statusText}===`);
      console.log(res);
    })
    .catch(err => console.log(err));
}

//////////////////////////
//////////////////////////
// 2. RECIPIENT OPERATIONS
//////////////////////////
//////////////////////////
export function addRecipient(recipient) {
  // const recipient = [
  //   {
  //     email: 'jonathan@ivan.com',
  //     first_name: 'Jonathan',
  //     last_name: 'Ivan'
  //   }
  // ];
  const url = `https://api.sendgrid.com/v3/contactdb/recipients`;
  return (
    axios
      .post(url, recipient, headers)
      // .then(res => {
      //   console.log(`===addRecipient===`);
      //   console.log(res);
      // })
      .catch(err => console.log(err))
  );
}

export function addRecipients(recipients) {
  const url = `https://api.sendgrid.com/v3/contactdb/recipients`;
  return new Promise(function (resolve, reject) {
    axios
      .post(url, recipients, headers)
      .then(res => {
        console.log(`===addRecipients===`);
        resolve(res);
      })
      .catch(err => console.log(err));
  });
}

export function getRecipient() {
  const recipient_id = 'am9uYXRoYW5AaXZhbi5jb20='; // Jonathan Ivan
  const url = `https://api.sendgrid.com/v3/contactdb/recipients/${recipient_id}`;
  axios
    .get(url, headers)
    .then(res => {
      console.log(`===getRecipient: ${res.status}===`);
      console.log(res.data);
    })
    .catch(err => console.log(err));
}

export function getRecipients() {
  const url = `https://api.sendgrid.com/v3/contactdb/recipients`;
  axios
    .get(url, headers)
    .then(res => {
      console.log(`===addRecipient: ${res.status}===`);
      console.log(res.data);
    })
    .catch(err => console.log(err));
}

export function updateRecipient() {
  const config = {
    method: 'PATCH',
    url: 'https://api.sendgrid.com/v3/contactdb/recipients',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}`
    },
    data: [
      {
        email: 'jonathan@ivan.com',
        first_name: '123Jonathan',
        last_name: '123Ivan'
      }
    ]
  };
  axios(config)
    .then(res => {
      console.log(`===updateRecipient===`);
      console.log(res);
    })
    .catch(err => console.log(err));
}

export function deleteRecipient() {
  const recipient_id = `am9uYXRoYW5AaXZhbi5jb20=`; // jonathan ivan
  const url = `https://api.sendgrid.com/v3/contactdb/recipients/${recipient_id}`;
  axios
    .delete(url, headers)
    .then(res => {
      console.log(`===deleteRecipient: ${res.status}===`);
      console.log(res.statusText);
    })
    .catch(err => console.log(err));
}

export function deleteRecipients() {
  const config = {
    method: 'DELETE',
    url: 'https://api.sendgrid.com/v3/contactdb/recipients',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}`
    },
    data: [
      'YnJpYW5AbWVuZG96YS5jb20=', // Brian Mendoza
      'anVhbkBzaWVycmEuY29t' // Juan Sierra
    ]
  };
  axios(config)
    .then(res => {
      console.log(`===deleteRecipients===`);
      console.log(res);
    })
    .catch(err => console.log(err));
}

//////////////////////////
//////////////////////////
// 3. SELECTION OPERATIONS
//////////////////////////
//////////////////////////
export function addContact(listId, recipientId) {
  const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}/recipients/${recipientId}`;
  return (
    axios
      .post(url, null, headers)
      // .then(res => {
      //   console.log(
      //     `===addContact: recipient_id ${recipient_id} added to listId ${listId}===`
      //   );
      //   console.log(res.statusText);
      // })
      .catch(err => console.log(err))
  );
}

export function addContacts(listId, recipient_ids) {
  const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}/recipients`;

  return new Promise(function (resolve, reject) {
    axios
      .post(url, recipient_ids, headers)
      .then(res => {
        console.log(`===addContacts===`);
        resolve(res);
      })
      .catch(err => console.log(err));
  });
}

export function getContacts(listId) {
  // listId = 7202079;
  const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}/recipients`;
  console.log('listId:', listId);
  console.log(url);

  return axios.get(url, headers);
  // .then(res => {
  //   console.log(`===getContacts: ${res.data.recipient_count}===`);
  //   console.log(res.data.recipients);
  // })
  // .catch(err => console.log(err));
}
export function deleteContact(listId, recipientId) {
  const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}/recipients/${recipientId}`;
  return (
    axios
      .delete(url, headers)
      // .then(res => {
      //   console.log(
      //     `===deleteContact: recipient_id: ${recipient_id} deleted from listId ${listId}===`
      //   );
      //   console.log(res.statusText);
      // })
      .catch(err => console.log(err))
  );
}

//////////////////////////
//////////////////////////
// 4. CAMPAIGN OPERATIONS
//////////////////////////
//////////////////////////
export function addRefreshr(new_refreshr) {
  const url = 'https://api.sendgrid.com/v3/campaigns';

  return new Promise(function (resolve, reject) {
    axios
      .post(url, new_refreshr, headers)
      .then(res => {
        console.log(`===addRefreshr===`);
        resolve(res);
      })
      .catch(err => console.log(err));
  });
}

export function getRefreshr() {
  const url = `https://api.sendgrid.com/v3/campaigns/${campaign_id}`;
  axios
    .get(url, headers)
    .then(res => {
      console.log(`===getRefreshr: all===`);
      console.log(res.data);
    })
    .catch(err => console.log(err));
}

export function getRefreshrs() {
  const url = 'https://api.sendgrid.com/v3/campaigns?limit=10&offset=0';
  axios
    .get(url, headers)
    .then(res => {
      console.log(`===getRefreshrs: all===`);
      console.log(res.data.result);
    })
    .catch(err => console.log(err));
}

export function updateRefreshr() {
  const updated_refreshr = {
    title: '123March Newsletter',
    subject: '123New Products for Spring!',
    categories: null,
    html_content:
      '<html><head><title></title></head><body><p>123Check out our spring line!</p></body></html>',
    plain_content: '123Check out our spring line!'
  };
  const url = `https://api.sendgrid.com/v3/campaigns/${campaign_id}`;
  axios
    .patch(url, updated_refreshr, headers)
    .then(res => {
      console.log(`===updateRefreshr: ${res.data.title}===`);
      console.log(res);
    })
    .catch(err => console.log(err));
}

export function deleteRefreshr() {
  const url = `https://api.sendgrid.com/v3/campaigns/${campaign_id}`;
  axios
    .delete(url, headers)
    .then(res => {
      console.log(`===deleteRefreshr: ===`);
      console.log(res);
    })
    .catch(err => console.log(err));
}

export function scheduleRefreshr(timeData, campaign_id) {
  const url = `https://api.sendgrid.com/v3/campaigns/${campaign_id}/schedules`;
  return new Promise(function (resolve, reject) {
    axios
      .post(url, timeData, headers)
      .then(res => {
        console.log(`===scheduleRefreshr: ===`);
        resolve(res);
      })
      .catch(err => console.log(err));
  });
}

export function rescheduleRefreshr() {
  const scheduleObj = {
    send_at: 1551103260 // Feb 25, 2019 8:01AM
  };
  const url = `https://api.sendgrid.com/v3/campaigns/${campaign_id}/schedules`;
  axios
    .patch(url, scheduleObj, headers)
    .then(res => {
      console.log(`===scheduleRefreshr: ===`);
      console.log(res);
    })
    .catch(err => console.log(err));
}

export function getScheduleRefreshr() {
  const url = `https://api.sendgrid.com/v3/campaigns/${campaign_id}/schedules`;
  axios
    .get(url, headers)
    .then(res => {
      console.log(`===getScheduleRefreshr: ===`);
      console.log(res.data.send_at);
    })
    .catch(err => console.log(err));
}

export function deleteScheduleRefreshr() {
  const url = `https://api.sendgrid.com/v3/campaigns/${campaign_id}/schedules`;
  axios
    .delete(url, headers)
    .then(res => {
      console.log(`===deleteScheduleRefreshr: ${res.status}===`);
      console.log(res);
    })
    .catch(err => console.log(err));
}

export function sendTestRefreshr() {
  const emailObj = {
    to: 'magdalena.aurelia@cowstore.net' // Only 1 email allowed
  };
  const url = `https://api.sendgrid.com/v3/campaigns/${campaign_id}/schedules/test`;
  axios
    .post(url, emailObj, headers)
    .then(res => {
      console.log(`===deleteScheduleRefreshr: ${res.data.status}===`);
      console.log(res);
    })
    .catch(err => console.log(err));
}
