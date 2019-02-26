import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  wrapper: {
  }
});

function RecipientForm(props) {
  const [contactName, addContactName] = useState("")
  const [contactsName, addContactsName] = useState("")
  const [contacts, getContacts] = useState("")
  const [contact, deleteContact] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
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

  return (
    <Grid className={props.classes.wrapper}>
      <p>RecipientForm Component</p>
      <button onClick={(e) => handlePrev(e)}>PREV</button>
      <button onClick={(e) => handleNext(e)}>NEXT</button>
      <form className={props.classes.form} onSubmit={(e) => handleSubmit(e)}>
        <TextField
          name="contactName"
          type="text"
          variant="outlined"
          value={contactName}
          placeholder="Add Contact Name"
          onChange={(e) => addContactName(e.target.value)}
        />
        <TextField
          name="contactsName"
          type="text"
          variant="outlined"
          value={contactsName}
          placeholder="Add Contacts Names"
          onChange={(e) => addContactsName(e.target.value)}
        />
        <TextField
          name="contacts"
          type="text"
          variant="outlined"
          value={contacts}
          placeholder="Find Contact Name"
          onChange={(e) => getContacts(e.target.value)}
        />
        <TextField
          name="contact"
          type="text"
          variant="outlined"
          value={contact}
          placeholder="Find Contact Name"
          onChange={(e) => deleteContact(e.target.value)}
        />
        <Button variant="outlined" color="secondary" type="submit">Next</Button>
      </form>
    </Grid>
  );
};

export default withStyles(styles)(RecipientForm);
