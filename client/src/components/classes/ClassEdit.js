import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
  }
});

function ClassEdit(props) {

  return (
    <Grid className={props.classes.wrapper}>
      <h1>ClassEdit Component</h1>
    </Grid>
  );
};

export default withStyles(styles)(ClassEdit);
