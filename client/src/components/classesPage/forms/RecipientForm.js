import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Fab, Input } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import UpIcon from '@material-ui/icons/ArrowUpward';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';

const styles = theme => ({
  container: {
    width: '50%',
    border: `1px solid ${theme.palette.secondary.main}`,
    ...theme.mixins.gutters(),
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 8,
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.dark,
  },
  input: {
    width: '200px',
    marginBottom: theme.spacing.unit,
    padding: '1%',
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    fontSize: '1rem',
    borderRadius: '5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  navDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'center',
  },
  btn: {
    marginRight: theme.spacing.unit * 2,
    color: theme.palette.primary.main,
    background: theme.palette.secondary.main,
    width: 40,
    height: 40
  },
  nextText: {
    marginRight: theme.spacing.unit * 2
  },
  hrStyle: {
    margin: '1rem auto',
  }
});

function RecipientForm(props) {
  const { classes, recipientData } = props;

  const [recipient, setRecipient] = useState({
    email: '',
    first_name: '',
    last_name: ''
  });

  const handleChange = e => {
    e.preventDefault();
    setRecipient({
      ...recipient,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const new_recipient = {
      email: recipient.email,
      first_name: recipient.first_name,
      last_name: recipient.last_name
    };

    props.setRecipientData(recipientData.concat(new_recipient));

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
    <Paper className={classes.container}>
      <Typography variant="h6" color="secondary" style={{ textAlign: 'center' }}>
        Recipients Form
      </Typography>

      <h1>Recipients to add</h1>
      {
        recipientData.length > 0 ? (
          recipientData.map(
            (recipient, i) => (
              // console.log(recipient),
              (
                <div key={i}>
                  <p style={{ color: 'white' }}>
                    {i + 1}. {recipient.first_name} {' '} {recipient.last_name}<br />
                    email: {recipient.email}
                  </p>
                </div>
              )
            )
          )
        ) : (
            <p>You need to add new recipients.</p>
          )
      }

      <hr className={classes.hrStyle} />

      <form className={classes.form} onSubmit={e => handleSubmit(e)}>
        <Input
          className={classes.input}
          name="email"
          type="email"
          variant="outlined"
          value={recipient.email}
          placeholder="email"
          onChange={(e) => handleChange(e)}
          disableUnderline
          required
        />
        <Input
          className={classes.input}
          name="first_name"
          type="text"
          variant="outlined"
          value={recipient.first_name}
          placeholder="first name"
          onChange={(e) => handleChange(e)}
          required
        />
        <Input
          className={classes.input}
          name="last_name"
          type="text"
          variant="outlined"
          value={recipient.last_name}
          placeholder="last name"
          onChange={(e) => handleChange(e)}
          required
        />

        <div className={classes.buttonDiv}>
          <Fab
            elevation={20}
            className={classes.btn}
            type="submit"
          >
            <UpIcon />
          </Fab>
          <Typography
            variant="body2"
            color="secondary"
            className={classes.nextText}
          >
            Add Recipient
          </Typography>
        </div>
      </form>

      <hr className={classes.hrStyle} />

      <div className={classes.navDiv}>
        <div className={classes.buttonDiv}>
          <Fab className={classes.btn}>
            <ArrowBack onClick={e => handlePrev(e)} />
          </Fab>
          <Typography
            variant="body2"
            color="secondary"
            className={classes.nextText}
          >
            PREV
        </Typography>
        </div>
        <div className={classes.buttonDiv}>
          <Typography
            variant="body2"
            color="secondary"
            className={classes.nextText}
          >
            NEXT
          </Typography>
          <Fab className={classes.btn}>
            <ArrowForward onClick={e => handleNext(e)} />
          </Fab>
        </div>
      </div>
    </Paper>

  );
}

export default withStyles(styles)(RecipientForm);