import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { ClassList, } from '../index.js'

const styles = theme => ({
  wrapper: {
    textAlign: "left",
  }
});

function ClassPage(props) {

  return (
    <Grid>
      <ClassList />
      {/* <ClassCreate /> */}
      {/* <ClassEdit /> */}
      {/* <ClassOperations /> */}
    </Grid>
  )
}

export default withStyles(styles)(ClassPage);