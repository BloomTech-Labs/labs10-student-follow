import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {
  ListForm,
  RecipientForm,
  SelectionForm,
  CampaignForm
} from '../index.js';
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

  const ax = axios.create({
    // baseURL: 'https://refreshr.herokuapp.com' // production
    baseURL: 'http://localhost:9000' // development
  });

  const submitClassData = async () => {
    try {
      // add class to classes and tcr
      // teacher_id should be user id, using 1 for now
      const classRes = await ax.post('/classes', {
        name: listData.name
      }); // need to add cc field to classes, leaving it out for now
      const { newClassID } = classRes.data;

      // add students
      // assuming students don't exist in db for now
      const newStudents = []; // save as array to add to students_classes table

      for (const recipient of recipientData.recipients) {
        // should probably change these column names on back or front end so they're consistent
        const studentsRes = await ax.post('/students', {
          firstname: recipient.first_name,
          lastname: recipient.last_name,
          email: recipient.email
        });
        // we are not accounting yet for students already in db. will have to throw an error if one is found? or just add that student to the class
        const { newStudentID } = studentsRes.data;
        console.log('sid', newStudentID);
        newStudents.push(newStudentID);
      }
      // add students and class to students_classes table
      const scRes = await ax.post(`/classes/${newClassID}`, {
        students: newStudents
      });
      console.log('response:', scRes);

      // add refreshrs to tcr
      // refreshrs will already be created and so will have an id
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };

  return (
    <Grid className={props.classes.wrapper}>
      <h1>ClassCreateView Component</h1>
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
          submitClassData={submitClassData}
        />
      ) : null}
    </Grid>
  );
}

export default withStyles(styles)(ClassCreateView);
