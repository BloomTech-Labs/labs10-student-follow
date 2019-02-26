import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { ClassListView, ClassCreateView } from '../index.js'
import { Route } from 'react-router-dom'

const styles = theme => ({
  wrapper: {
    textAlign: "left",
  }
});

function SettingsPage(props) {

  return (
    <Grid>
      <ClassListView />
      {/* <Route exact path="/classes/create" render={props => <ClassCreateView />} /> */}
      {/* <ClassCreate /> */}
      {/* <ClassEdit /> */}
      {/* <ClassOperations /> */}
    </Grid>
  )
}

export default withStyles(styles)(SettingsPage);