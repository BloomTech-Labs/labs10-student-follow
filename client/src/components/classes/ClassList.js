import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { ClassCard } from '../index.js'

const styles = theme => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 1rem"
  }
});

function ClassList(props) {

  return (
    <Grid className={props.classes.wrapper}>
      <ClassCard />
      <ClassCard />
      <ClassCard />
    </Grid>
  );
};

export default withStyles(styles)(ClassList);
