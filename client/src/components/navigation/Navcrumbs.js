import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
    display: "flex",
    justifyContent: "flex start",
    textAlign: "left",
    margin: "0 1rem"
  }
});

const Navcrumbs = props => {
  return (
    <Grid className={props.classes.wrapper}>
      <p data-testid="crumbTrail"> Home > {props.page.page} </p>
    </Grid>
  );
};

export default withStyles(styles)(Navcrumbs);
