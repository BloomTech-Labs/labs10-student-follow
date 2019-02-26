import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { ListForm, RecipientForm, SelectionForm, CampaignForm } from '../index.js'
import axios from 'axios';

const styles = theme => ({
  wrapper: {}
});


function ClassCreateView(props) {
  const [classData, setClassData] = useState()

  const [stage, setStage] = useState({
    onListForm: true,
    onRecipientForm: false,
    onSelectionForm: false,
    onCampaignForm: false
  })

  const [formData, setFormData] = useState({
    "list": {
      "name": ""
    },
    "recipient": {
      "email": "",
      "first_name": "",
      "last_name": ""
    },
    "campaign": {
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
    }
  });

  useEffect(() => {
    getClassData();
  }, []);

  const getClassData = async () => {
    const response = await axios.get('https://refreshr.herokuapp.com/classes/13');
    console.log(`response: ${response}`)
    setClassData(response.data);
    console.log('class daata', classData)
  }

  return (
    <Grid className={props.classes.wrapper}>
      <h1>ClassCreateView Component</h1>

      {stage.onListForm ? (
        <ListForm
          formData={formData}
          stage={stage}
          setStage={setStage}
        />
      ) : null
      }

      {stage.onRecipientForm ? (
        <RecipientForm
          formData={formData}
          stage={stage}
          setStage={setStage}
        />
      ) : null
      }

      {stage.onSelectionForm ? (
        <SelectionForm
          formData={formData}
          stage={stage}
          setStage={setStage}
        />
      ) : null
      }

      {stage.onCampaignForm ? (
        <CampaignForm
          formData={formData}
          stage={stage}
          setStage={setStage}
        />
      ) : null
      }
    </Grid>
  );
}

export default withStyles(styles)(ClassCreateView);
