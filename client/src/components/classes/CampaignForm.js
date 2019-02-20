import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
  }
});

function CampaignForm(props) {

  return (
    <Grid className={props.classes.wrapper}>
      <p>CampaignForm Component</p>
    </Grid>
  );
};

export default withStyles(styles)(CampaignForm);
