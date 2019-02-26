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

  const handleSubmit = () => { }

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
        <Button variant="outlined" color="secondary" type="submit">Next</Button>
      </form>
    </Grid>
  );
};

export default withStyles(styles)(RecipientForm);
