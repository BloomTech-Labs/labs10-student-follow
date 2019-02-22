import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { SenderForm, RecipientForm, ListForm, CampaignForm } from '../index.js'
import axios from 'axios';

const styles = theme => ({
  wrapper: {}
});


function ClassCreate(props) {
  const [onSenderForm, setSenderForm] = useState(true)
  const [onRecipientForm, setRecipientForm] = useState(false)
  const [onListForm, setListForm] = useState(false)
  const [onCampaignForm, setCampaignForm] = useState(false)
  const [classData, setClassData] = useState(null);

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
      <h1>ClassCreate Component</h1>

      <SenderForm
        onSenderForm={onSenderForm}
        setSenderForm={setSenderForm}
        setRecipientForm={setRecipientForm}
      />

      <RecipientForm
        onRecipientForm={onRecipientForm}
        setRecipientForm={setRecipientForm}
        setListForm={setListForm}
      />

      <ListForm
        onListForm={onListForm}
        setListForm={setListForm}
        setCampaignForm={setCampaignForm}
      />

      <CampaignForm
        onCampaignForm={onCampaignForm}
        setCampaignForm={setCampaignForm}
        refreshrs={classData && classData.refreshrs.length ? classData.refreshrs : null}
      />
    </Grid>
  );
}

export default withStyles(styles)(ClassCreate);
