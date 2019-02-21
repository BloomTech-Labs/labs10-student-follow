import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { SenderForm, RecipientForm, ListForm, CampaignForm } from '../index.js'

const styles = theme => ({
  wrapper: {
  }
});

function ClassCreate(props) {
  const [onSenderForm, setSenderForm] = useState(true)
  const [onRecipientForm, setRecipientForm] = useState(false)
  const [onListForm, setListForm] = useState(false)
  const [onCampaignForm, setCampaignForm] = useState(false)

  return (
    <Grid className={props.classes.wrapper}>
      <h1>ClassCreate Component</h1>

      <SenderForm
        onSenderForm={onSenderForm}
        setSenderForm={setSenderForm}
      />

      <RecipientForm
        onRecipientForm={onRecipientForm}
        setRecipientForm={setRecipientForm}
      />

      <ListForm
        onListForm={onListForm}
        setListForm={setListForm}
      />

      <CampaignForm
        onCampaignForm={onCampaignForm}
        setCampaignForm={setCampaignForm}
      />

    </Grid>
  );
};

export default withStyles(styles)(ClassCreate);
