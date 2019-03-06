import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {
  ListForm,
  CampaignForm
} from '../index.js';
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
import submitClassData from './dbOps';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    //NEEDED TO CENTER VIEWS:
    [theme.breakpoints.up('sm')]: {
      width: `100% - ${200}px`,
      marginRight: 200
    }
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

  const [timeTriData, setTimeTriData] = useState([])

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

  // Schedule campaign for 2 days after class date
  const sendAllToSendgrid = () => {
    // Add new list name
    addList(listData.classnameInput + " 2d")
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
          sendAllToSendgrid2()
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
    addList(listData.classnameInput + " 2wk")
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
          sendAllToSendgrid3()
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
  }

  // Schedule campaign for 2 months after class date
  const sendAllToSendgrid3 = () => {
    addList(listData.classnameInput + " 2mo")
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
  }

  return (
    <Grid className={props.classes.wrapper}>
      {console.log(timeTriData)}
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
          sendAllToSendgrid={sendAllToSendgrid}
          // setTimeData={setTimeData}
          timeTriData={timeTriData}
          setTimeTriData={setTimeTriData}
        />
      ) : null}
    </Grid>
  );
}

export default withStyles(styles)(ClassCreateView);
