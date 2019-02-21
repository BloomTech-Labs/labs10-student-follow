import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  wrapper: {
  }
});

function RecipientForm(props) {
  const [ contactName, addContactName ] = useState("")
  const [ contactsName, addContactsName ] = useState("")
  const [ contacts, getContacts ] = useState("")
  const [ contact, deleteContact] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    props.setRecipientForm((!props.onRecipientForm))
  }

  return (
    <Grid className={props.classes.wrapper}>
      <p>RecipientForm Component</p>
      <button onClick={(e) => handleSubmit(e)}>COMPLETE</button>
      <form className={props.classes.form} onSubmit={(e) => handleSubmit(e)}>
        <input
          name="contactName"
          type="text"
          value={contactName}
          placeholder="Add Contact Name"
          onChange={(e) => addContactName(e.target.value)}
        />
        <input
          name="contactsName"
          type="text"
          value={contactsName}
          placeholder="Add Contacts Names"
          onChange={(e) => addContactsName(e.target.value)}
        />
        <input
          name="contacts"
          type="text"
          value={contacts}
          placeholder="Find Contact Name"
          onChange={(e) => getContacts(e.target.value)}
        />
        <input
          name="contact"
          type="text"
          value={contact}
          placeholder="Find Contact Name"
          onChange={(e) => deleteContact(e.target.value)}
        />
        <button type="submit">Next</button>
      </form>
    </Grid>
  );
};

export default withStyles(styles)(RecipientForm);
