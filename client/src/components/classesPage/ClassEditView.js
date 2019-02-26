import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
  }
});

function ClassEditView(props) {

  return (
    <Grid className={props.classes.wrapper}>
      <h1>ClassEditView Component</h1>
    </Grid>
  );
};

export default withStyles(styles)(ClassEditView);
