import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
  }
});

function RecipientForm(props) {

  return (
    <Grid className={props.classes.wrapper}>
      <p>RecipientForm Component</p>
    </Grid>
  );
};

export default withStyles(styles)(RecipientForm);
