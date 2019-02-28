import React, { useState, useEffect } from "react";
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

function SelectionForm(props) {

  const [senderInfo, setSenderInfo] = useState({
    nickname: '',
    senderName: '',
    senderEmail: '',
    replyName: '',
    replyEmail: '',
    address: '',
    address2: '',
    state: '',
    zip: '',
    city: '',
    country: ''
  })

  useEffect(() => {
    console.log(senderInfo);
  }, [senderInfo])

  const handleChange = e => {
    setSenderInfo({ ...senderInfo, [e.target.name]: e.target.value });
  }

  const handlePrev = (e) => {
    e.preventDefault()
    props.setStage({
      ...props.stage,
      onRecipientForm: !props.stage.onRecipientForm,
      onSelectionForm: !props.stage.onSelectionForm
    })
  }

  const handleNext = (e) => {
    e.preventDefault()
    props.setStage({
      ...props.stage,
      onSelectionForm: !props.stage.onSelectionForm,
      onCampaignForm: !props.stage.onCampaignForm
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <Grid className={props.classes.wrapper}>
      <p>SelectionForm Component</p>
      <button onClick={(e) => handlePrev(e)}>PREV</button>
      <button onClick={(e) => handleNext(e)}>NEXT</button>
      <form className={props.classes.form} onSubmit={(e) => handleSubmit(e)}>
        <input
          name="nickname"
          type="text"
          value={senderInfo.nickname}
          placeholder="Nickname"
          onChange={handleChange}
        />
        <input
          name="senderName"
          type="text"
          value={senderInfo.senderName}
          placeholder="Sender's Name"
          onChange={handleChange}
        />
        <input
          name="senderEmail"
          type="email"
          value={senderInfo.senderEmail}
          placeholder="Sender's Email"
          onChange={handleChange}
        />
        <input
          name="replyName"
          type="text"
          value={senderInfo.replyName}
          placeholder="Reply To Name"
          onChange={handleChange}
        />
        <input
          name="replyEmail"
          type="email"
          value={senderInfo.replyEmail}
          placeholder="Reply To Email"
          onChange={handleChange}
        />
        <input
          name="address"
          type="text"
          value={senderInfo.address}
          placeholder="Address"
          onChange={handleChange}
        />
        <input
          name="address2"
          type="text"
          value={senderInfo.address2}
          placeholder="Address2"
          onChange={handleChange}
        />
        <input
          name="state"
          type="text"
          value={senderInfo.state}
          placeholder="State"
          onChange={handleChange}
        />
        <input
          name="zip"
          type="number"
          value={senderInfo.zip}
          placeholder="Zip Code"
          onChange={handleChange}
        />
        <input
          name="city"
          type="text"
          value={senderInfo.city}
          placeholder="City"
          onChange={handleChange}
        />
        <input
          name="country"
          type="text"
          value={senderInfo.country}
          placeholder="Country"
          onChange={handleChange}
        />
        <button type="submit">Next</button>
      </form>
    </Grid >
  );
};

export default withStyles(styles)(SelectionForm);