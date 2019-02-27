import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { addContact, addContacts, getContacts, deleteContact } from "../../SendgridOps"

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

      <p>Add students to: {props.listData.name}?</p>
      {props.recipientData.recipients.length > 0 ? (
        props.recipientData.recipients.map((recipient, i) => (
          <div key={`${recipient.first_name}-${i}`}>
            <p>recipient-{i + 1}: {recipient.email}, {recipient.first_name}, {recipient.last_name}</p>
          </div>
        ))
      ) : <p>You need to add new recipients.</p>}
    </Grid >
  );
};

export default withStyles(styles)(SelectionForm);