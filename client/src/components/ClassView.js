import React from "react";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import { Navcrumbs, Navbar } from "./index.js";

const styles = theme => ({
  wrapper: {
    textAlign: "left"
  }
});

function ClassView(props) {
  // Variables used in multiple operations
  const headers = {
    "headers": { "Authorization": `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}` },
    "content-type": "application/json"
  }
  const listId = '7061244'

  // Basic CRUD operations
  const createList = () => {
    const url = "https://api.sendgrid.com/v3/contactdb/lists"
    const body = {
      "name": "test5"
    }
    axios.post(url, body, headers)
      .then(res => {
        console.log(`===Create list: ${res.data.name}===`)
        console.log(res.data.id)
      })
      .catch(err => console.log(err))
  }

  const getAllLists = () => {
    const url = "https://api.sendgrid.com/v3/contactdb/lists"
    axios.get(url, headers)
      .then(res => {
        console.log(`===Retrieve list: all===`)
        console.log(res.data.lists)
      })
      .catch(err => console.log(err))
  }

  const getOneList = () => {
    const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}`
    axios.get(url, headers)
      .then(res => {
        console.log(`===Retrieve list: ${res.data.name}===`)
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }

  const updateOneList = () => {
    const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}`
    const body = {
      "name": "modifiedListName"
    }
    axios.patch(url, body, headers)
      .then(res => {
        console.log(`===Update list: ${res.data.name}===`)
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  const deleteOneList = () => {
    const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}?delete_contacts=true`
    axios.delete(url, headers)
      .then(res => {
        console.log(`===Delete list: ${res.statusText}===`)
        console.log(res)
      })
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
          <div>
            <button onClick={createList}>createList</button>
            <button onClick={getAllLists}>getAllLists</button>
            <button onClick={getOneList}>getOneList</button>
            <button onClick={updateOneList}>updateOneList</button>
            <button onClick={deleteOneList}>deleteOneList</button>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(ClassView);
