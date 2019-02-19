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
  // VARIABLES
  const headers = {
    "headers": { "Authorization": `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}` },
    "content-type": "application/json"
  }
  const listId = "7061139"
  const recipientId = "YXN0dXJpYXN4aUBnbWFpbC5jb20="
  const recipientIds = ["YXJlbGkuYXRoZW5zQGNvd3N0b3JlLm5ldA==", "YXN0dXJpYXN4aUBnbWFpbC5jb20="]

  // LIST OPERATIONS
  const addList = () => {
    const url = "https://api.sendgrid.com/v3/contactdb/lists"
    const body = {
      "name": "test4"
    }
    axios.post(url, body, headers)
      .then(res => {
        console.log(`===addList: ${res.data.name}===`)
        console.log(res.data.id)
      })
      .catch(err => console.log(err))
  }

  const getLists = () => {
    const url = "https://api.sendgrid.com/v3/contactdb/lists"
    axios.get(url, headers)
      .then(res => {
        console.log(`===getLists: all===`)
        console.log(res.data.lists)
      })
      .catch(err => console.log(err))
  }

  const getList = () => {
    const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}`
    axios.get(url, headers)
      .then(res => {
        console.log(`===getList: ${res.data.name}===`)
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }

  const updateList = () => {
    const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}`
    const body = {
      "name": "modifiedListName"
    }
    axios.patch(url, body, headers)
      .then(res => {
        console.log(`===updateList: ${res.data.name}===`)
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  const deleteList = () => {
    const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}?delete_contacts=true`
    axios.delete(url, headers)
      .then(res => {
        console.log(`===deleteList: ${res.statusText}===`)
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  // LIST RECIPIENTS OPERATIONS
  const getContacts = () => {
    const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}/recipients`
    axios.get(url, headers)
      .then(res => {
        console.log(`===getContacts: ${res.data.recipient_count}===`)
        console.log(res.data.recipients)
      })
      .catch(err => console.log(err))
  }
  const addContact = () => {
    const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}/recipients/${recipientId}`
    axios.post(url, null, headers)
      .then(res => {
        console.log(`===addContact: recipientId ${recipientId} added to listId ${listId}===`)
        console.log(res.statusText)
      })
      .catch(err => console.log(err))
  }
  const addContacts = () => {
    const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}/recipients`
    axios.post(url, recipientIds, headers)
      .then(res => {
        console.log(`===addContacts: recipientIds ${recipientIds} added to listId ${listId}===`)
        console.log(res.statusText)
      })
      .catch(err => console.log(err))
  }
  const deleteContact = () => {
    const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}/recipients/${recipientId}`
    axios.delete(url, headers)
      .then(res => {
        console.log(`===deleteContact: recipientId: ${recipientId} deleted from listId ${listId}===`)
        console.log(res.statusText)
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
            <h1>LIST OPERATIONS</h1>
            <button onClick={addList}>addList</button>
            <button onClick={getLists}>getLists</button>
            <button onClick={getList}>getList</button>
            <button onClick={updateList}>updateList</button>
            <button onClick={deleteList}>deleteList</button>
          </div>
          <div>
            <h1>LIST RECIPIENT OPERATIONS</h1>
            <button onClick={getContacts}>getContacts</button>
            <button onClick={addContact}>addContact</button>
            <button onClick={addContacts}>addContacts</button>
            <button onClick={deleteContact}>deleteContact</button>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(ClassView);
