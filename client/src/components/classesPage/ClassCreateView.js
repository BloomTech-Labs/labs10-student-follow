import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { ListForm } from '../index.js'
import axios from 'axios';

const styles = theme => ({
  wrapper: {}
});


function ClassCreateView(props) {
  const [onListForm, setListForm] = useState(true)
  const [onRecipientForm, setRecipientForm] = useState(false)
  // const [onSenderForm, setSenderForm] = useState(false)
  // const [onCampaignForm, setCampaignForm] = useState(false)
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
      <h1>ClassCreateView Component</h1>

      {onListForm ? (
        <ListForm
          onListForm={onListForm}
          setListForm={setListForm}
          onRecipientFor={onRecipientForm}
          setRecipientForm={setRecipientForm}
        />
      ) : null
      }

      {/* <SenderForm
        onSenderForm={onSenderForm}
        setSenderForm={setSenderForm}
        setRecipientForm={setRecipientForm}
      />

      <RecipientForm
        onRecipientForm={onRecipientForm}
        setRecipientForm={setRecipientForm}
        setListForm={setListForm}
      />


      <CampaignForm
        onCampaignForm={onCampaignForm}
        setCampaignForm={setCampaignForm}
        refreshrs={classData && classData.refreshrs.length ? classData.refreshrs : null}
      /> */}
    </Grid>
  );
}

export default withStyles(styles)(ClassCreateView);
