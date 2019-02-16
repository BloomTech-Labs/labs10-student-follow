import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
    border: "2px solid black",
    borderRadius: "3px",
    height: "90vh",
    margin: "0 1rem",
    padding: "0 1rem"
  }
});

const Navbar = props => {
  return (
    <Grid className={props.classes.wrapper}>
      <p>Refreshrs</p>
      <p>Classes</p>
      <p>Billing</p>
      <p>Settings</p>
    </Grid>
  );
};

export default withStyles(styles)(Navbar);
