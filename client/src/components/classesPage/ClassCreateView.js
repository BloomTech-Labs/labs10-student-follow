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
  // addContact, getContacts, deleteContact,
  addRefreshr,
  scheduleRefreshr
  // , getRefreshr, getRefreshrs, updateRefreshr, deleteRefreshr, rescheduleRefreshr, getScheduleRefreshr, deleteScheduleRefreshr, sendTestRefreshr
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
  // const [classlist, setClasslist] = useState({});

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
      list_ids: [123],
      recipient_ids: ["abc123"]
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
    addList(listData.classnameInput)
      .then(res => {
        console.log(res)
        // const recipients = {
        //   recipient: recipientData
        // }
        // console.log(recipientsList)
        validated.list_ids.push(res.data.id)
        console.log(validated)
        return addRecipients(recipientData)
      })

      // Add new recipients, get validated ids, spread into recipient_ids
      .then(res => {
        console.log("After addRecipients")
        validated.recipient_ids = [
          ...validated.recipient_ids,
          ...res.data.persisted_recipients
        ]
        console.log(validated)
        return addContacts(validated.list_ids[0], validated.recipient_ids)
      })

      // Add selected recipients to list, expect 201 for success
      .then(res => {
        console.log("After addContacts")
        validated.selectionCode = res.status
        if (res.status === 201) {
          console.log("addContacts 201")
          return addRefreshr(new_refresher)
        }
        console.log(validated)
      })

      // Send new_refreshr object to SG, expect 201 for success
      .then(res => {
        if (res.status === 201) {
          validated.campaign_id = res.data.id
          return scheduleRefreshr(scheduleObj, validated.campaign_id)
        }
        console.log(validated)
      })

      .then(res => {
        if (res.status === 201) {
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
          // setClasslist={setClasslist}
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
