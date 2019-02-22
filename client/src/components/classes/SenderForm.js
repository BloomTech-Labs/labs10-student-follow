import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "25%",
    '& input': {
      margin: "5px",
    }
  }
});

function SenderForm(props) {
  const [nickname, setNickname] = useState("")
  const [senderName, setSenderName] = useState("")
  const [senderEmail, setSenderEmail] = useState("")
  const [replyName, setReplyName] = useState("")
  const [replyEmail, setReplyEmail] = useState("")
  const [address, setAddress] = useState("")
  const [address2, setAddress2] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    props.setSenderForm((!props.onSenderForm))
    props.setRecipientForm((!props.onRecipientForm))
  }

  return (
    <Grid className={props.classes.wrapper}>
      <p>SenderForm Component</p>
      <button onClick={(e) => handleSubmit(e)}>COMPLETE</button>
      <form className={props.classes.form} onSubmit={(e) => handleSubmit(e)}>
        <input
          name="nickname"
          type="text"
          value={nickname}
          placeholder="Nickname"
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          name="senderName"
          type="text"
          value={senderName}
          placeholder="Sender's Name"
          onChange={(e) => setSenderName(e.target.value)}
        />
        <input
          name="senderEmail"
          type="email"
          value={senderEmail}
          placeholder="Sender's Email"
          onChange={(e) => setSenderEmail(e.target.value)}
        />
        <input
          name="replyName"
          type="text"
          value={replyName}
          placeholder="Reply To Name"
          onChange={(e) => setReplyName(e.target.value)}
        />
        <input
          name="replyEmail"
          type="email"
          value={replyEmail}
          placeholder="Reply To Email"
          onChange={(e) => setReplyEmail(e.target.value)}
        />
        <input
          name="address"
          type="text"
          value={address}
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          name="address2"
          type="text"
          value={address2}
          placeholder="Address2"
          onChange={(e) => setAddress2(e.target.value)}
        />
        <input
          name="state"
          type="text"
          value={state}
          placeholder="State"
          onChange={(e) => setState(e.target.value)}
        />
        <input
          name="zip"
          type="number"
          value={zip}
          placeholder="Zip Code"
          onChange={(e) => setZip(e.target.value)}
        />
        <input
          name="city"
          type="text"
          value={city}
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          name="country"
          type="text"
          value={country}
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
        />
        <button type="submit">Next</button>
      </form>
    </Grid >
  );
};

export default withStyles(styles)(SenderForm);
