import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { RefreshrCard } from "./index.js";

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
    <Grid className={props.classes.wrapper}>
      <RefreshrCard />
      <RefreshrCard />
      <RefreshrCard />
    </Grid>
  );
};
export default withStyles(styles)(RefreshrList);
