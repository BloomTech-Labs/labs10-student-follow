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
  // addContact, , getContacts, deleteContact,
  addRefreshr,
  scheduleRefreshr
  // getRefreshr, getRefreshrs, updateRefreshr, deleteRefreshr, , rescheduleRefreshr, getScheduleRefreshr, deleteScheduleRefreshr, sendTestRefreshr
} from '../SendgridOps'
//import axios from 'axios';

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
  const [file, setFile] = useState({filename:'No File Chosen', content:{}});
  const [classlist, setClasslist] = useState({});

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
    "title": "",
    "subject": "",
    "sender_id": "",
    "list_id": "",
    "segment_ids": null,
    "categories": [],
    "suppression_group_id": 9332,
    "custom_unsubscribe_url": "",
    "ip_pool": "",
    "html_content": "",
    "plain_content": ""
  })

  return (
    <Grid className={props.classes.wrapper}>
      <h1>ClassCreateView Component</h1>
      {stage.onListForm ? (
        <ListForm
          file={file}
          setFile={setFile}
          classlist={classlist}
          setClasslist={setClasslist}
          listData={listData}
          setListData={setListData}
          stage={stage}
          setStage={setStage}
        />
      ) : null
      }

      {stage.onRecipientForm ? (
        <RecipientForm
          classlist={classlist}
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
        />
      ) : null
      }
    </Grid>
  );
}

export default withStyles(styles)(ClassCreateView);
