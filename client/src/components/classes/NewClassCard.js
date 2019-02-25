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
    height: "200px"
  }
});

const NewClassCard = props => {
  return (
    <Grid className={props.classes.wrapper}>
      <h1>New Class</h1>
    </Grid>
  );
};
export default withStyles(styles)(NewClassCard);
