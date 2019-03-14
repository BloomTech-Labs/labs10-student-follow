import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { ListForm, CampaignForm } from '../index.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: 600
  },
  loadingWrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: 600,
    position: 'relative',
    backgroundColor: 'white',
    filter: 'blur(2px)',
    height: '100vh',
    width: '100vh'
  },
  loading: {
    position: 'absolute',
    top: '40%',
    color: 'blue',
    zIndex: '1'
  }
});

function ClassCreateView(props) {
  // HOOKS
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

  const [isLoading, setIsLoading] = useState(false);

  // VARIABLES
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

  // SENDGRID AXIOS INSTANCE
  const sgAx = axios.create({
    baseURL: 'https://api.sendgrid.com/v3',
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}`
    }
  });

  const token = localStorage.getItem('accessToken');

  const ax = axios.create({
    //baseURL: 'https://refreshr.herokuapp.com', // production
    baseURL: 'http://localhost:9000',
    headers: {
      authorization: `Bearer ${token}` // development
    }
  });

  const sgDb = async refreshrs => {
    try {
      setIsLoading(true);
      let firstPass = true; // flag to ensure we don't submit the same list to sendgrid
      let list; // to store list id
      for (let refreshr of refreshrs) {
        // create list
        if (firstPass) {
          let body = {
            name: listData.classnameInput
          };
          let res = await sgAx.post('/contactdb/lists', body);
          list = res.data.id;
          firstPass = false; // so we don't try to create duplicate lists

          // save class and list to db
          await ax.post('/classes', {
            name: listData.classnameInput,
            sg_list_id: list
          });

          // create recipients and add to list
          for (let recipient of recipientData) {
            // create sg recipient
            let recipient_id = await sgAx.post('/contactdb/recipients', [
              recipient
            ]);
            [recipient_id] = recipient_id.data.persisted_recipients;

            // save student to students table (only on first pass)
            recipient.sg_recipient_id = recipient_id;
            await ax.post('/students', recipient);

            // add student and class to students_classes
            ax.post(`/classes/${list}/students`, {
              student_id: recipient_id
            });

            // add recipient to list
            await sgAx.post(
              `/contactdb/lists/${list}/recipients/${recipient_id}`
            );
          }
        }

        // assign the class list to the refreshr
        newRefreshr.list_ids = [list];

        // create three campaigns with the refreshr
        const teacher_id = localStorage.getItem('user_id');
        for (let i = 0; i < 3; i++) {
          const refreshrRes = await sgAx.post('/campaigns', newRefreshr);

          const campaign_id = refreshrRes.data.id;

          // attach campaign id to the refreshr and post to tcr table
          const tcrRefreshr = {
            teacher_id,
            refreshr_id: refreshr.refreshr_id,
            date: refreshr.date,
            sg_campaign_id: campaign_id
          };
          await ax.post(`/classes/${list}/campaigns`, tcrRefreshr);

          // schedule the three campaigns
          await sgAx.post(
            `/campaigns/${campaign_id}/schedules`,
            refreshr.timeTriData[i]
          );
        }
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <CircularProgress
          size={80}
          thickness={4}
          className={props.classes.loading}
        />
      )}
      <Grid
        className={
          isLoading ? props.classes.loadingWrapper : props.classes.wrapper
        }
      >
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
    </>
  );
}

export default withStyles(styles)(ClassCreateView);
