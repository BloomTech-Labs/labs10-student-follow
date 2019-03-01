import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { ListForm, RecipientForm, SelectionForm, CampaignForm } from '../index.js'
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

} from '../SendgridOps'
// import axios from 'axios';

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
    },
  }
});

function ClassCreateView(props) {
  const [file, setFile] = useState({ filename: 'No File Chosen', content: {} });

  const [stage, setStage] = useState({
    onListForm: true,
    onRecipientForm: false,
    onSelectionForm: false,
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
    sender_id: '',
    list_id: '',
    segment_ids: null,
    categories: [],
    suppression_group_id: 9332,
    custom_unsubscribe_url: '',
    ip_pool: '',
    html_content: '',
    plain_content: ''
  });

  const sendAllToSendgrid = () => {
    let validated = {
      list_ids: [], // from addList()
      recipient_ids: [], //from addRecipients()
      selection_code: null, // HTTP status from addContacts()
      campaign_id: null, // HTTP status from addRefreshr()
      schedule_code: null // HTTP status from scheduleRefreshr()
    };

    const new_refreshr = {
      title: "March Refreshr", // required
      subject: "React Refreshr", // required
      sender_id: 428251, // constant (Refreshr Team)
      list_ids: validated.list_ids, // required
      segment_ids: null,
      categories: [],
      suppression_group_id: 9332, // constant (Unsubscribe ID)
      custom_unsubscribe_url: "",
      ip_pool: "",
      html_content: "<html><head><title></title></head><body><p>React is a JavaScript library! [unsubscribe]</p></body></html>", // required
      plain_content: "React is an awesome library! [unsubscribe]" // required
    }

    const scheduleObj = {
      "send_at": 1551448800 // March 1st 8AM CST
    }

    // Add new list name
    addList(listData.classnameInput)
      .then(res => {
        validated.list_ids.push(res.data.id)
        return addRecipients(recipientData)
      })

      // Add new recipients
      .then(res => {
        validated.recipient_ids = [
          ...validated.recipient_ids,
          ...res.data.persisted_recipients
        ]
        return addContacts(validated.list_ids[0], validated.recipient_ids)
      })

      // Add all new recipients to list
      .then(res => {
        validated.selection_code = res.status
        if (validated.selection_code === 201) {
          return addRefreshr(new_refreshr)
        }
      })

      // Send Refreshr object with unix time to be scheduled
      .then(res => {
        if (res.status === 201) {
          validated.campaign_id = res.data.id
          return scheduleRefreshr(scheduleObj, validated.campaign_id)
        }
      })

      // Sucess if all steps complete
      .then(res => {
        if (res.status === 201) {
          validated.schedule_code = res.status
          console.log(`Success! Your campaign ${res.data.id} is scheduled for ${res.data.send_at}. Status is "${res.data.status}"!`)
        }
      })

      .catch(err => console.log(err))
  }

  return (
    <Grid className={props.classes.wrapper}>
      <h1>ClassCreateView Component</h1>
      <button onClick={(e) => sendAllToSendgrid(e)}>sendAllToSendgrid</button>
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
        />
      ) : null}
    </Grid>
  );
}

export default withStyles(styles)(ClassCreateView);