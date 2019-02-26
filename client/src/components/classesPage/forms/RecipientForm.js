import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  wrapper: {}
});

function RecipientForm(props) {
  const handleChange = (e) => {
    e.preventDefault()
    props.setRecipientData({
      ...props.recipientData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const new_recipient = {
      email: props.recipientData.email,
      first_name: props.recipientData.first_name,
      last_name: props.recipientData.last_name,
    }

    props.setRecipientData({
      ...props.recipientData,
      addedRecipients: props.recipientData.addedRecipients.concat(new_recipient)
    })
  }

  const handlePrev = (e) => {
    e.preventDefault()
    props.setStage({
      ...props.stage,
      onListForm: !props.stage.onListForm,
      onRecipientForm: !props.stage.onRecipientForm
    })
  }

  const handleNext = (e) => {
    e.preventDefault()
    props.setStage({
      ...props.stage,
      onRecipientForm: !props.stage.onRecipientForm,
      onSelectionForm: !props.stage.onSelectionForm
    })
  }

  const { addedRecipients } = props.recipientData
  return (
    <Grid className={props.classes.wrapper}>
      <p>RecipientForm Component</p>
      <button onClick={(e) => handlePrev(e)}>PREV</button>
      <button onClick={(e) => handleNext(e)}>NEXT</button>

      <form className={props.classes.form} onSubmit={(e) => handleSubmit(e)}>
        <TextField
          name="email"
          type="email"
          variant="outlined"
          value={props.recipientData.email}
          placeholder="email"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="first_name"
          type="text"
          variant="outlined"
          value={props.recipientData.first_name}
          placeholder="first name"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="last_name"
          type="text"
          variant="outlined"
          value={props.recipientData.last_name}
          placeholder="last name"
          onChange={(e) => handleChange(e)}
        />
        <Button variant="outlined" color="secondary" type="submit">Add Recipient</Button>
      </form>

      <h1>Added Recipients</h1>
      {addedRecipients.length > 0 ? (
        addedRecipients.map((recipient, i) => (
          <div key={`${recipient.first_name}-${i}`}>
            <p>recipient-{i + 1}: {recipient.email}, {recipient.first_name}, {recipient.last_name}</p>
          </div>
        ))
      ) : <p>You need to add new recipients.</p>}
    </Grid>
  );
};

export default withStyles(styles)(RecipientForm);
