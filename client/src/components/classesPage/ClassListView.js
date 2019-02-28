import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { NewClassCard, ExistingClassCard } from '../index.js'

const styles = theme => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 1rem"
  }
});

function ClassListView(props) {

  return (
    <Grid className={props.classes.wrapper}>
      <ExistingClassCard />
      <ExistingClassCard />
      <NewClassCard />
    </Grid>
  );
};

export default withStyles(styles)(ClassListView);
