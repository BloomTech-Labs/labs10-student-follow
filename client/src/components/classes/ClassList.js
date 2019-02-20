import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    margin: "0 1rem"
  }
});

const ClassList = props => {
  return (
    <Grid className={props.classes.wrapper}>
      <p>ClassList</p>
    </Grid>
  );
};
export default withStyles(styles)(ClassList);
