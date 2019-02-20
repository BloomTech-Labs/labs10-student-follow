import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
  }
});

function ListForm(props) {

  return (
    <Grid className={props.classes.wrapper}>
      <p>ListForm Component</p>
    </Grid>
  );
};

export default withStyles(styles)(ListForm);
