import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { Navcrumbs, Navbar, RefreshersList } from "./index.js";

const styles = theme => ({
  wrapper: {
    textAlign: "left"
  }
});

const RefreshersView = props => {
  return (
    <>
      <Navcrumbs />
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <Navbar />
        </Grid>
        <Grid item xs={10}>
          <RefreshersList />
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(RefreshersView);
