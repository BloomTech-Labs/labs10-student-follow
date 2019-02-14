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

const RefreshrList = props => {
  return (
    <>
      <Grid className={props.classes.wrapper}>
        <p>Card</p>
        <p>Card</p>
        <p>Card</p>
      </Grid>
    </>
  );
};
export default withStyles(styles)(RefreshrList);
