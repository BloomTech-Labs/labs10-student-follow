import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { ListForm, CampaignForm } from '../index.js';
import axios from 'axios';
import {
  addList,
  // getList, getLists, updateList, deleteList,
  addRecipients,
  // addRecipient, getRecipient, getRecipients, updateRecipient, deleteRecipient, deleteRecipients,
  addContacts,
  // addContact, addContacts, getContacts, deleteContact,
  addRefreshr,
  scheduleRefreshr
  // addRefreshr, getRefreshr, getRefreshrs, updateRefreshr, deleteRefreshr, scheduleRefreshr, rescheduleRefreshr, getScheduleRefreshr, deleteScheduleRefreshr, sendTestRefreshr
} from './SendgridOps';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

function ClassCreateView(props) {
  const [file, setFile] = useState({ filename: 'No File Chosen', content: {} });

  const [stage, setStage] = useState({
    onListForm: true,
    onCampaignForm: false
  });

  const [listData, setListData] = useState({
    classnameInput: '',
    ccBool: false
  });

  const [recipientData, setRecipientData] = useState([]);

  const [campaignData, setCampaignData] = useState({
    title: '',
    subject: '',
    html_content: '', // requires [unsubscribe]
    plain_content: '' // requires [unsubscribe]
  });

  const [timeTriData, setTimeTriData] = useState([]);

  // const [timeData, setTimeData] = useState({
  //   send_at: null
  // });

  let validated = {
    list_ids: [], // from addList()
    recipient_ids: [], //from addRecipients()
    selection_code: null, // HTTP status from addContacts()
    campaign_id: [], // HTTP status from addRefreshr()
    schedule_code: null // HTTP status from scheduleRefreshr()
  };

  // New object pulling different pieces of data before promise chain
  const newRefreshr = {
    title: campaignData.title,
    subject: campaignData.subject,
    sender_id: 428251, // permanent (Refreshr Team)
    list_ids: validated.list_ids,
    segment_ids: null,
    categories: [],
    suppression_group_id: 9332, // permanent (Unsubscribe ID)
    custom_unsubscribe_url: '',
    ip_pool: '',
    html_content: campaignData.html_content, // requires [unsubscribe]
    plain_content: campaignData.plain_content // requires [unsubscribe]
  };

  useEffect(() => {
    console.log(campaignData);
  }, [campaignData]);

  // sendgrix axios instance
  const sgAx = axios.create({
    baseURL: 'https://api.sendgrid.com/v3',
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}`
    }
  });

  const token = localStorage.getItem('accessToken');

  const ax = axios.create({
    // baseURL: 'https://refreshr.herokuapp.com' // production
    baseURL: 'http://localhost:9000',
    headers: {
      authorization: `Bearer ${token}` // development
    }
  });

  const sgDb = async refreshr_id => {
    // create list
    console.log(listData.classnameInput);
    console.log(recipientData);
    let body = {
      name: listData.classnameInput
    };
    let res = await sgAx.post('/contactdb/lists', body);
    console.log('res:', res);
    const list = res.data.id;

    // save class and list to db
    const classRes = await ax.post('/classes', {
      name: listData.classnameInput,
      sg_list_id: list
    });

    const { classId } = classRes.data.newClassID;

    console.log(classId);

    // create recipients and add to list
    const students = []; // to keep track of student id's for insert into students_classes
    for (let recipient of recipientData) {
      // create sg recipient
      console.log(recipient);
      let recipient_id = await sgAx.post('/contactdb/recipients', [recipient]);
      [recipient_id] = recipient_id.data.persisted_recipients;
      console.log('recipient id:', recipient_id);

      // save student to students table
      recipient.sg_recipient_id = recipient_id;
      const studentRes = await ax.post('/students', recipient);
      console.log(studentRes);

      // add student and class to students_classes
      ax.post(`/classes/${list}/students`, {
        student_id: recipient_id
      });

      // add recipient to list
      const res = await sgAx.post(
        `/contactdb/lists/${list}/recipients/${recipient_id}`
      );
      console.log('add recipient:', res);
    }

    // create campaign 1, 2, 3
    // console.log(newRefreshr);
    // console.log(timeTriData);
    newRefreshr.list_ids = [list];

    // create three campaigns with the refreshr
    const campaign_ids = [];
    for (let i = 0; i < 3; i++) {
      const refreshrRes = await sgAx.post('/campaigns', newRefreshr);
      console.log(refreshrRes);
      campaign_ids.push(refreshrRes.data.id);
    }
    console.log(campaign_ids);

    // attach the campaign id and post to tcr table
    const teacher_id = localStorage.getItem('user_id');
    const refreshr = {
      teacher_id,
      refreshr_id: 


    }


    // schedule the three campaigns
    for (let i = 0; i < 3; i++) {
      // const time = {
      //   send_at: timeTriData[i]
      // };
      // console.log(time);
      const res = await sgAx.post(
        `/campaigns/${campaign_ids[i]}/schedules`,
        timeTriData[i]
      );
      console.log(res);
    }
  };

  // Schedule campaign for 2 days after class date
  const sendAllToSendgrid = () => {
    // Add new list name
    addList(listData.classnameInput + ' 2d')
      .then(res => {
        validated.list_ids.push(res.data.id);
        console.log(`91`);
        console.log(recipientData);
        return addRecipients(recipientData);
      })

      // Add new recipients
      .then(res => {
        validated.recipient_ids = [
          ...validated.recipient_ids,
          ...res.data.persisted_recipients
        ];
        console.log(`102`);
        console.log(validated.list_ids[0]);
        console.log(validated.recipient_ids);
        return addContacts(validated.list_ids[0], validated.recipient_ids);
      })

      // Add all new recipients to list
      .then(res => {
        validated.selection_code = res.status;
        if (validated.selection_code === 201) {
          console.log(`112`);
          console.log(newRefreshr);
          return addRefreshr(newRefreshr);
        }
      })

      // Send Refreshr object with unix time to be scheduled
      .then(res => {
        if (res.status === 201) {
          validated.campaign_id.push(res.data.id);
          console.log(`122`);
          console.log(timeTriData[0]);
          console.log(validated.campaign_id[0]);
          return scheduleRefreshr(timeTriData[0], validated.campaign_id[0]);
        }
      })

      // Success if all steps complete
      .then(res => {
        if (res.status === 201) {
          validated.schedule_code = res.status;
          console.log(
            `Success! Your campaign ${res.data.id} is scheduled for ${
              res.data.send_at
            }. Status is "${res.data.status}"!`
          );
          // setTimeout(() => {
          sendAllToSendgrid2();
          // }, 2000);
          // setTimeout(() => {
          //   campaignData.campaign_id = validated.campaign_id; // tacking on for submitCD
          //   submitClassData(
          //     listData,
          //     validated.list_ids[0],
          //     recipientData,
          //     campaignData
          //   );
          // }, 30000);
        }
      })
      .catch(err => console.log(err));
  };

  // Schedule campaign for 2 weeks after class date
  const sendAllToSendgrid2 = () => {
    addList(listData.classnameInput + ' 2wk')
      .then(res => {
        validated.list_ids.push(res.data.id);
        console.log(`160`);
        console.log(validated.list_ids[1]);
        console.log(validated.recipient_ids);
        return addContacts(validated.list_ids[1], validated.recipient_ids);
      })
      .then(res => {
        if (res.status === 201) {
          console.log(`167`);
          console.log(validated.list_ids[0]);
          console.log(validated.recipient_ids);
          return addRefreshr(newRefreshr);
        }
      })
      .then(res => {
        if (res.status === 201) {
          validated.campaign_id.push(res.data.id);
          console.log(`174`);
          console.log(timeTriData[1]);
          console.log(validated.campaign_id[1]);
          return scheduleRefreshr(timeTriData[1], validated.campaign_id[1]);
        }
      })
      .then(res => {
        if (res.status === 201) {
          validated.schedule_code = res.status;
          console.log(
            `Success! Your campaign ${res.data.id} is scheduled for ${
              res.data.send_at
            }. Status is "${res.data.status}"!`
          );
          // setTimeout(() => {
          sendAllToSendgrid3();
          // }, 2000);
          // setTimeout(() => {
          //   campaignData.campaign_id = validated.campaign_id; // tacking on for submitCD
          //   submitClassData(
          //     listData,
          //     validated.list_ids[0],
          //     recipientData,
          //     campaignData
          //   );
          // }, 30000);
        }
      })
      .catch(err => console.log(err));
  };

  // Schedule campaign for 2 months after class date
  const sendAllToSendgrid3 = () => {
    addList(listData.classnameInput + ' 2mo')
      .then(res => {
        validated.list_ids.push(res.data.id);
        console.log(`212`);
        console.log(validated.list_ids[2]);
        console.log(validated.recipient_ids);
        return addContacts(validated.list_ids[2], validated.recipient_ids);
      })
      .then(res => {
        if (res.status === 201) {
          console.log(`219`);
          return addRefreshr(newRefreshr);
        }
      })
      .then(res => {
        if (res.status === 201) {
          validated.campaign_id.push(res.data.id);
          console.log(`226`);
          console.log(timeTriData[2]);
          console.log(validated.campaign_id[2]);
          return scheduleRefreshr(timeTriData[2], validated.campaign_id[2]);
        }
      })
      .then(res => {
        if (res.status === 201) {
          validated.schedule_code = res.status;
          console.log(
            `Success! Your campaign ${res.data.id} is scheduled for ${
              res.data.send_at
            }. Status is "${res.data.status}"!`
          );
          // setTimeout(() => {
          //   campaignData.campaign_id = validated.campaign_id; // tacking on for submitCD
          //   submitClassData(
          //     listData,
          //     validated.list_ids[0],
          //     recipientData,
          //     campaignData
          //   );
          // }, 30000);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <Grid className={props.classes.wrapper}>
      {stage.onListForm ? (
        <ListForm
          file={file}
          setFile={setFile}
          recipientData={recipientData}
          listData={listData}
          setListData={setListData}
          stage={stage}
          setStage={setStage}
          setRecipientData={setRecipientData}
        />
      ) : null}

      {stage.onCampaignForm ? (
        <CampaignForm
          campaignData={campaignData}
          setCampaignData={setCampaignData}
          stage={stage}
          setStage={setStage}
          sendAllToSendgrid={sgDb}
          // setTimeData={setTimeData}
          timeTriData={timeTriData}
          setTimeTriData={setTimeTriData}
        />
      ) : null}
    </Grid>
  );
}

export default withStyles(styles)(ClassCreateView);
