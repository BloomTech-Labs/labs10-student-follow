import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
    border: "1px solid black",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    margin: "1rem",
    width: "30%",
    height: "30%"
  }
});

const RefreshrCard = props => {
  return (
    <Grid className={props.classes.wrapper}>
      <h1>Class Card</h1>
    </Grid>
  );
};
export default withStyles(styles)(RefreshrCard);