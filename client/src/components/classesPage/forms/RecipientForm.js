import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import { addRecipient, addRecipients, getRecipient, getRecipients, updateRecipient, deleteRecipient, deleteRecipients } from "../../SendgridOps"

const styles = theme => ({
  wrapper: {}
});

function RecipientForm(props) {
  const { classlist } = props;

  const [recipient, setRecipient] = useState({
    id: '',
    email: '',
    first_name: '',
    last_name: ''
  });

  const handleChange = ({ target: { name, value } }) => {
    setRecipient({
      ...recipient,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const new_recipient = {
      email: recipient.email,
      first_name: recipient.first_name,
      last_name: recipient.last_name
    };

    props.setRecipientData({
      recipients: classlist.concat(new_recipient)
    });

    setRecipient({
      email: '',
      first_name: '',
      last_name: ''
    });
  };

  const handlePrev = e => {
    e.preventDefault();
    props.setStage({
      ...props.stage,
      onListForm: !props.stage.onListForm,
      onRecipientForm: !props.stage.onRecipientForm
    });
  };

  const handleNext = e => {
    e.preventDefault();
    props.setStage({
      ...props.stage,
      onRecipientForm: !props.stage.onRecipientForm,
      onSelectionForm: !props.stage.onSelectionForm
    });
  };

  return (
    <Grid className={props.classes.wrapper}>
      <p>RecipientForm Component</p>
      <button onClick={e => handlePrev(e)}>PREV</button>
      <button onClick={e => handleNext(e)}>NEXT</button>

      <form className={props.classes.form} onSubmit={e => handleSubmit(e)}>
        <TextField
          name="email"
          type="email"
          variant="outlined"
          value={recipient.email}
          placeholder="email"
          onChange={e => handleChange(e)}
          required
        />
        <TextField
          name="first_name"
          type="text"
          variant="outlined"
          value={recipient.first_name}
          placeholder="first name"
          onChange={e => handleChange(e)}
          required
        />
        <TextField
          name="last_name"
          type="text"
          variant="outlined"
          value={recipient.last_name}
          placeholder="last name"
          onChange={e => handleChange(e)}
          required
        />
        <Button variant="outlined" color="secondary" type="submit">
          Add Recipient
        </Button>
      </form>

      <h1>Added Recipients</h1>
      {classlist.length > 0 ? (
        classlist.map(
          (recipient, i) => (
            //console.log(recipient),
            (
              <div key={recipient.id}>
                <p style={{ color: 'white' }}>
                  recipient-{i + 1}: {recipient.email}, {recipient.first_name},{' '}
                  {recipient.last_name}
                </p>
              </div>
            )
          )
        )
      ) : (
        <p>You need to add new recipients.</p>
      )}
    </Grid>
  );
}

export default withStyles(styles)(RecipientForm);
