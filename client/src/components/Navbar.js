import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
    border: "2px solid black",
    borderRadius: "3px",
    height: "90vh",
    margin: "0 1rem"
  }
});

const Navbar = props => {
  return (
    <>
      <Grid className={props.classes.wrapper}>
        <a href="#">
          <p>Refreshers</p>
        </a>
        <a href="#">
          <p>Classes</p>
        </a>
        <a href="#">
          <p>Billing</p>
        </a>
        <a href="#">
          <p>Settings</p>
        </a>
      </Grid>
    </>
  );
};
export default withStyles(styles)(Navbar);
