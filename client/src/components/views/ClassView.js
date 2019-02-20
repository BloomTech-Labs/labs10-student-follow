import React from "react";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
    textAlign: "left",
  }
});

function ClassView(props) {

  // VARIABLES
  const headers = {
    "headers": { "Authorization": `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}` },
    "content-type": "application/json"
  }
  const listId = 7061139 // test3
  const recipient_id = "YXN0dXJpYXN4aUBnbWFpbC5jb20=" // Timmy
  const recipient_ids = ["YXJlbGkuYXRoZW5zQGNvd3N0b3JlLm5ldA==", "YXN0dXJpYXN4aUBnbWFpbC5jb20="] // Magda, Timmy
  const sender_id = 425702 // The Refreshr Team
  const campaign_id = 5001224 // March Newsletter



  // REFRESHRS OPERATIONS
  const addRefreshr = () => {
    const new_refresher = {
      "title": "March Newsletter",
      "subject": "New Products for Spring!",
      "sender_id": 424711,
      "list_ids": [
        7061129,
        7061137
      ],
      "segment_ids": null,
      "categories": null,
      "suppression_group_id": null,
      "custom_unsubscribe_url": "",
      "ip_pool": null,
      "html_content": "<html><head><title></title></head><body><p>Check out our spring line!</p></body></html>",
      "plain_content": "Check out our spring line!"
    }
    const url = "https://api.sendgrid.com/v3/campaigns"
    axios.post(url, new_refresher, headers)
      .then(res => {
        console.log(`===addRefreshr===`)
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  const getRefreshr = () => {
    const url = `https://api.sendgrid.com/v3/campaigns/${campaign_id}`
    axios.get(url, headers)
      .then(res => {
        console.log(`===getRefreshr: all===`)
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }

  const getRefreshrs = () => {
    const url = "https://api.sendgrid.com/v3/campaigns?limit=10&offset=0"
    axios.get(url, headers)
      .then(res => {
        console.log(`===getRefreshrs: all===`)
        console.log(res.data.result)
      })
      .catch(err => console.log(err))
  }

  const updateRefreshr = () => {
    const updated_refreshr = {
      "title": "123March Newsletter",
      "subject": "123New Products for Spring!",
      "categories": null,
      "html_content": "<html><head><title></title></head><body><p>123Check out our spring line!</p></body></html>",
      "plain_content": "123Check out our spring line!"
    }
    const url = `https://api.sendgrid.com/v3/campaigns/${campaign_id}`
    axios.patch(url, updated_refreshr, headers)
      .then(res => {
        console.log(`===updateRefreshr: ${res.data.title}===`)
        console.log(res)
      })
      .catch(err => console.log(err))
  }
  const deleteRefreshr = () => {
    const url = `https://api.sendgrid.com/v3/campaigns/${campaign_id}`
    axios.delete(url, headers)
      .then(res => {
        console.log(`===deleteRefreshr: ===`)
        console.log(res)
      })
      .catch(err => console.log(err))
  }



  // SENDER OPERATIONS
  const addSender = () => {
    const new_sender = {
      "nickname": "asturiasxi@gmail.com",
      "from": {
        "email": "asturiasxi@gmail.com",
        "name": "asturiasxi @ Refreshr"
      },
      "reply_to": {
        "email": "asturiasxi@gmail.com",
        "name": "Refreshr Team"
      },
      "address": "222 West Ave",
      "address_2": "Ste HR100",
      "city": "Austin",
      "state": "Texas",
      "zip": "78701",
      "country": "United States"
    }
    // const new_sender = {
    //   "nickname": "The Refreshr Team",
    //   "from": {
    //     "email": "timmyturner123@refreshr.com",
    //     "name": "Timmy Turner @ Refreshr"
    //   },
    //   "reply_to": {
    //     "email": "team@refreshr.com",
    //     "name": "Refreshr Team"
    //   },
    //   "address": "222 West Ave",
    //   "address_2": "Ste HR100",
    //   "city": "Austin",
    //   "state": "Texas",
    //   "zip": "78701",
    //   "country": "United States"
    // }
    const url = "https://api.sendgrid.com/v3/senders"
    axios.post(url, new_sender, headers)
      .then(res => {
        console.log(`===addSender: ${res.data.nickname}===`)
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }

  const getSender = () => {
    const url = `https://api.sendgrid.com/v3/senders/${sender_id}`
    axios.get(url, headers)
      .then(res => {
        console.log(`===getSender: ${res.data.nickname}===`)
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }

  const getSenders = () => {
    const url = "https://api.sendgrid.com/v3/senders"
    axios.get(url, headers)
      .then(res => {
        console.log(`===getSenders: all===`)
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }

  const updateSender = () => {
    const url = `https://api.sendgrid.com/v3/senders/${sender_id}`
    const updated_sender = {
      "nickname": "123The Refreshr Team",
      "from": {
        "email": "123timmyturner123@refreshr.com",
        "name": "123Timmy Turner @ Refreshr"
      },
      "reply_to": {
        "email": "123team@refreshr.com",
        "name": "123Refreshr Team"
      },
      "address": "222 West Ave",
      "address_2": "Ste HR100",
      "city": "Austin",
      "state": "Texas",
      "zip": "78701",
      "country": "United States"
    }
    axios.patch(url, updated_sender, headers)
      .then(res => {
        console.log(`===updateSender: res.data.nickname===`)
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  const deleteSender = () => {
    const url = `https://api.sendgrid.com/v3/senders/${sender_id}`
    axios.delete(url, headers)
      .then(res => {
        console.log(`===deleteSender: ${res.statusText}===`)
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  const resendVerification = () => {
    const url = `https://api.sendgrid.com/v3/senders/${sender_id}/resend_verification`
    axios.post(url, null, headers)
      .then(res => {
        console.log(`===resendVerification: ${res.status}===`)
        console.log(res)
      })
      .catch(err => console.log(err))
  }



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

  const getList = () => {
    const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}`
    axios.get(url, headers)
      .then(res => {
        console.log(`===getList: ${res.data.name}===`)
        console.log(res.data)
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
  const addContact = () => {
    const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}/recipients/${recipient_id}`
    axios.post(url, null, headers)
      .then(res => {
        console.log(`===addContact: recipient_id ${recipient_id} added to listId ${listId}===`)
        console.log(res.statusText)
      })
      .catch(err => console.log(err))
  }

  const addContacts = () => {
    const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}/recipients`
    axios.post(url, recipient_ids, headers)
      .then(res => {
        console.log(`===addContacts: recipient_ids ${recipient_ids} added to listId ${listId}===`)
        console.log(res.statusText)
      })
      .catch(err => console.log(err))
  }

  const getContacts = () => {
    const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}/recipients`
    axios.get(url, headers)
      .then(res => {
        console.log(`===getContacts: ${res.data.recipient_count}===`)
        console.log(res.data.recipients)
      })
      .catch(err => console.log(err))
  }
  const deleteContact = () => {
    const url = `https://api.sendgrid.com/v3/contactdb/lists/${listId}/recipients/${recipient_id}`
    axios.delete(url, headers)
      .then(res => {
        console.log(`===deleteContact: recipient_id: ${recipient_id} deleted from listId ${listId}===`)
        console.log(res.statusText)
      })
      .catch(err => console.log(err))
  }



  return (
    <Grid container>
      < Grid item xs={10} >
        <div>
          <h1>REFRESHRS OPERATIONS</h1>
          <button onClick={addRefreshr} style={{ background: "limegreen" }} >addRefreshr</button>
          <button onClick={getRefreshr} style={{ background: "goldenrod" }} >getRefreshr</button>
          <button onClick={getRefreshrs} style={{ background: "goldenrod" }} >getRefreshrs</button>
          <button onClick={updateRefreshr} style={{ background: "lightpink" }} >updateRefreshr</button>
          <button onClick={deleteRefreshr} style={{ background: "crimson" }} >deleteRefreshr</button>
        </div>
        <div>
          <h1>SENDER OPERATIONS</h1>
          <button onClick={addSender} style={{ background: "limegreen" }} >addSender</button>
          <button onClick={getSender} style={{ background: "goldenrod" }} >getSender</button>
          <button onClick={getSenders} style={{ background: "goldenrod" }} >getSenders</button>
          <button onClick={updateSender} style={{ background: "lightpink" }} >updateSender</button>
          <button onClick={deleteSender} style={{ background: "crimson" }} >deleteSender</button>
          <button onClick={resendVerification} style={{ background: "teal" }} >resendVerification</button>
        </div>
        <div>
          <h1>LIST OPERATIONS</h1>
          <button onClick={addList} style={{ background: "limegreen" }} >addList</button>
          <button onClick={getList} style={{ background: "goldenrod" }} >getList</button>
          <button onClick={getLists} style={{ background: "goldenrod" }} >getLists</button>
          <button onClick={updateList} style={{ background: "lightpink" }} >updateList</button>
          <button onClick={deleteList} style={{ background: "crimson" }} >deleteList</button>
        </div>
        <div>
          <h1>LIST RECIPIENT OPERATIONS</h1>
          <button onClick={addContact} style={{ background: "limegreen" }} >addContact</button>
          <button onClick={addContacts} style={{ background: "limegreen" }} > addContacts</button>
          <button onClick={getContacts} style={{ background: "goldenrod" }} >getContacts</button>
          <button onClick={deleteContact} style={{ background: "crimson" }} >deleteContact</button>
        </div>
      </Grid >
    </Grid >
  );
};

export default withStyles(styles)(ClassView);
