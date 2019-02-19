import React from "react";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import { Navcrumbs, Navbar } from "../index.js";

const styles = theme => ({
  wrapper: {
    textAlign: "left"
  }
});

function ClassView(props) {
  const getAllLists = () => {
    const url = "https://api.sendgrid.com/v3/contactdb/lists"
    const headers = {
      headers: { "Authorization": `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}` }
    }

    axios.get(url, headers)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <>
      <Navcrumbs />
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <Navbar />
        </Grid>
        <Grid item xs={10}>
          <p>ClassView</p>
          <button onClick={getAllLists}>getAllLists</button>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(ClassView);
