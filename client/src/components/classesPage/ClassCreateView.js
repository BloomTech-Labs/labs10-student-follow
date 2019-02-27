import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { ListForm, RecipientForm, SelectionForm, CampaignForm } from '../index.js'
import {
  addList,
  // getList, getLists, updateList, deleteList,
  // addRecipient, addRecipients, getRecipient, getRecipients, updateRecipient, deleteRecipient, deleteRecipients,
  // addContact, addContacts, getContacts, deleteContact,
  // addRefreshr, getRefreshr, getRefreshrs, updateRefreshr, deleteRefreshr, scheduleRefreshr, rescheduleRefreshr, getScheduleRefreshr, deleteScheduleRefreshr, sendTestRefreshr
} from '../SendgridOps'

const styles = theme => ({
  wrapper: {}
});

function ClassCreateView(props) {
  const [stage, setStage] = useState({
    onListForm: true,
    onRecipientForm: false,
    onSelectionForm: false,
    onCampaignForm: false
  })

  const [listData, setListData] = useState({
    name: "",
    ccBool: false
  })

  const [recipientData, setRecipientData] = useState({
    recipients: []
  })

  const [campaignData, setCampaignData] = useState({
    title: "",
    subject: "",
    sender_id: "",
    list_ids: "",
    segment_ids: null,
    categories: [],
    suppression_group_id: 9332,
    custom_unsubscribe_url: "",
    ip_pool: "",
    html_content: "",
    plain_content: ""
  })

  const [validatedList, setValidatedList] = useState({
    list_ids: []
  })

  const sendAllToSendgrid = () => {
    addList(listData.name) // send name of list
      .then(res => { // res returns the id validated by SendGrid
        setValidatedList({
          ...validatedList,
          list_ids: validatedList.list_ids.push(res) // save the id of the list for later use
        })
        console.log(validatedList)
      })
      .catch(err => console.log(err))

  }

  return (
    <Grid className={props.classes.wrapper}>
      <h1>ClassCreateView Component</h1>
      <button onClick={(e) => sendAllToSendgrid(e)}>sendAllToSendgrid</button>
      {stage.onListForm ? (
        <ListForm
          listData={listData}
          setListData={setListData}
          stage={stage}
          setStage={setStage}
        />
      ) : null
      }

      {stage.onRecipientForm ? (
        <RecipientForm
          recipientData={recipientData}
          setRecipientData={setRecipientData}
          stage={stage}
          setStage={setStage}
        />
      ) : null
      }

      {stage.onSelectionForm ? (
        <SelectionForm
          listData={listData}
          recipientData={recipientData}
          stage={stage}
          setStage={setStage}
        />
      ) : null
      }

      {stage.onCampaignForm ? (
        <CampaignForm
          campaignData={campaignData}
          setCampaignData={setCampaignData}
          stage={stage}
          setStage={setStage}
          sendAllToSendgrid={sendAllToSendgrid}
        />
      ) : null
      }
    </Grid>
  );
}

export default withStyles(styles)(ClassCreateView);
