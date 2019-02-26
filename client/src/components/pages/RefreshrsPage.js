import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { RefreshrListView } from '../index.js'

const styles = theme => ({
  wrapper: {
    textAlign: "left",
  }
});

function RefreshrsPage(props) {

  return (
    <Grid>
      <RefreshrListView />
    </Grid>
  )
}

export default withStyles(styles)(RefreshrsPage);