import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { SenderForm, RecipientForm, ListForm, CampaignForm } from '../index.js'

const styles = theme => ({
  wrapper: {
  }
});

function ClassCreate(props) {

  return (
    <Grid className={props.classes.wrapper}>
      <h1>ClassCreate Component</h1>
      <SenderForm />
      <RecipientForm />
      <ListForm />
      <CampaignForm />
    </Grid>
  );
};

export default withStyles(styles)(ClassCreate);
