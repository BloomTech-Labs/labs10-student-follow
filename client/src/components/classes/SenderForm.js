import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
  }
});

function SenderForm(props) {

  return (
    <Grid className={props.classes.wrapper}>
      <p>SenderForm Component</p>
    </Grid>
  );
};

export default withStyles(styles)(SenderForm);
