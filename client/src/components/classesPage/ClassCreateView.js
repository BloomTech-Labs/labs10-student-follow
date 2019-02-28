import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {
  ListForm,
  RecipientForm,
  SelectionForm,
  CampaignForm
} from '../index.js';
import {
  addList,
  // getList, getLists, updateList, deleteList,
  addRecipients,
  // addRecipient, getRecipient, getRecipients, updateRecipient, deleteRecipient, deleteRecipients,
  addContacts,
  // addContact, , getContacts, deleteContact,
  addRefreshr,
  scheduleRefreshr
  // getRefreshr, getRefreshrs, updateRefreshr, deleteRefreshr, , rescheduleRefreshr, getScheduleRefreshr, deleteScheduleRefreshr, sendTestRefreshr
} from '../SendgridOps';
import axios from 'axios';

const styles = theme => ({
  wrapper: {}
});

function ClassCreateView(props) {
  const [stage, setStage] = useState({
    onListForm: true,
    onRecipientForm: false,
    onSelectionForm: false,
    onCampaignForm: false
  });

  const [listData, setListData] = useState({
    name: '',
    ccBool: false
  });

  const [recipientData, setRecipientData] = useState({
    recipients: []
  });

  const [timeData, setTimeData] = useState({
    send_at: 1551448800 // March 1st 8AM CST
    // send_at: null
  });

  const [campaignData, setCampaignData] = useState({
    title: 'March Refreshr', // INPUT REQUIRED
    subject: 'React Refreshr', // INPUT REQUIRED
    sender_id: 428251, // Refreshr Team, constant
    list_ids: [],
    segment_ids: null,
    categories: [],
    suppression_group_id: 9332, // Unsubscribe ID, constant
    custom_unsubscribe_url: '',
    ip_pool: '',
    html_content:
      '<html><head><title></title></head><body><p>React is a JavaScript library! [unsubscribe]</p></body></html>', // INPUT REQUIRED
    plain_content: 'React is a JavaScript library! [unsubscribe]' // INPUT REQUIRED
  });

  const sendAllToSendgrid = () => {
    let validated = {
      recipient_ids: [],
      selectionCode: null,
      campaign_id: null
    };

    const scheduleObj = {
      send_at: timeData.send_at
    };

    const new_refresher = {
      title: "March Refreshr", // INPUT REQUIRED
      subject: "React Refreshr", // INPUT REQUIRED
      sender_id: 428251, // Refreshr Team, constant
      list_ids: validated.list_ids, // INPUT REQUIRED
      segment_ids: null,
      categories: [],
      suppression_group_id: 9332, // Unsubscribe ID, constant
      custom_unsubscribe_url: "",
      ip_pool: "",
      html_content: "<html><head><title></title></head><body><p>React is a JavaScript library! [unsubscribe]</p></body></html>", // INPUT REQUIRED
      plain_content: "Check out our spring line! [unsubscribe]" // INPUT REQUIRED
    }

    const scheduleObj = {
      "send_at": 1551448800 // March 1st 8AM CST
    }

    // Add new list name, get validated id, push into list_ids
    addList(listData.name)
      .then(res => {
        // campaignData.list_ids = res.data.id
        campaignData.list_ids.push(res.data.id);
        console.log(validated);
        return addRecipients(recipientData.recipients);
      })
      // Add new recipients, get validated ids, spread into recipient_ids
      .then(res => {
        validated.recipient_ids = [
          ...validated.recipient_ids,
          ...res.data.persisted_recipients
        ];
        console.log(validated);
        return addContacts(campaignData.list_ids[0], validated.recipient_ids);
      })

      // Add selected recipients to list, expect 201 for success
      .then(res => {
        validated.selectionCode = res.status;
        if (res.status === 201) {
          console.log('addContacts 201');
          console.log(campaignData);
          return addRefreshr(campaignData);
        }
        console.log(validated);
      })

      // Send new_refreshr object to SG, expect 201 for success
      .then(res => {
        if (res.status === 201) {
          validated.campaign_id = res.data.id;
          return scheduleRefreshr(scheduleObj, validated.campaign_id);
        }
        console.log(validated);
      })

      .then(res => {
        if (res.status === 201) {
          console.log(
            `Success! Your campaign ${res.data.id} is scheduled for ${
              res.data.send_at
            }. Status is "${res.data.status}"!`
          );
        }
      })

      .catch(err => console.log(err));
  };

  return (
    <Grid className={props.classes.wrapper}>
      <h1>ClassCreateView Component</h1>
      <button onClick={e => sendAllToSendgrid(e)}>sendAllToSendgrid</button>
      {stage.onListForm ? (
        <ListForm
          listData={listData}
          setListData={setListData}
          stage={stage}
          setStage={setStage}
        />
      ) : null}

      {stage.onRecipientForm ? (
        <RecipientForm
          recipientData={recipientData}
          setRecipientData={setRecipientData}
          stage={stage}
          setStage={setStage}
        />
      ) : null}

      {stage.onSelectionForm ? (
        <SelectionForm
          listData={listData}
          recipientData={recipientData}
          stage={stage}
          setStage={setStage}
        />
      ) : null}

      {stage.onCampaignForm ? (
        <CampaignForm
          campaignData={campaignData}
          setCampaignData={setCampaignData}
          stage={stage}
          setStage={setStage}
          sendAllToSendgrid={sendAllToSendgrid}
          setTimeData={setTimeData}
        />
      ) : null}
    </Grid>
  );
}

export default withStyles(styles)(ClassCreateView);
