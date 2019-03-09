import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, FormGroup, Fab, Input, Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import CloudUpload from '@material-ui/icons/CloudUpload';
import GroupAdd from '@material-ui/icons/GroupAdd';
import ArrowForward from '@material-ui/icons/ArrowForward';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import Attachment from '@material-ui/icons/Attachment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import BigPapa from 'papaparse';

const styles = theme => ({
  container: {
    border: `1px solid ${theme.palette.secondary.main}`,
    ...theme.mixins.gutters(),
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 8,
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 4,
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.dark,
    [theme.breakpoints.only('sm')]: {
      width: '60vw'
    },
    [theme.breakpoints.only('xs')]: {
      width: '90vw'
    },
    maxWidth: 600
  },
  input1: {
    marginBottom: theme.spacing.unit,
    padding: '.75%',
    paddingLeft: 60,
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    fontSize: '1em',
    width: 200,
    borderRadius: 5
  },
  input3: {
    margin: '3% 1%',
    padding: '0.75% 3%',
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    fontSize: '1em',
    borderRadius: 5
  },
  checkboxDiv: {
    marginLeft: theme.spacing.unit * 2
  },
  checkbox: {
    marginRight: theme.spacing.unit,
    color: theme.palette.secondary.main,
    width: 40,
    height: 40
  },
  form1: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'column nowrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: theme.spacing.unit * 2
  },
  form2: {
    width: '100%',
    display: 'flex',
    margin: '2rem 0',

    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  form3: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2rem 0',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  csvDiv: {
    width: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing.unit * 2
    }
  },
  btn: {
    marginRight: theme.spacing.unit * 2,
    color: theme.palette.primary.main,
    background: theme.palette.secondary.main,
    width: 40,
    height: 40
  },
  btn3: {
    width: 60,
    height: 60,
    color: theme.palette.primary.main,
    background: theme.palette.secondary.main,
    marginLeft: theme.spacing.unit,
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing.unit * 2,
      width: 40,
      height: 40
    }
  },
  uploadInput: {
    display: 'flex',
    flexFlow: 'row nowrap',
    margin: '5% 0',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.secondary.main
  },
  inputFont: {
    fontSize: '.8rem',
    marginLeft: theme.spacing.unit * 2
  },
  nextText: {
    marginRight: theme.spacing.unit * 2
  },
  navDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    },
    [theme.breakpoints.only('md')]: {
      width: '60%'
    }
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  hrStyle: {
    margin: '1rem auto',
    width: '100%'
  },
  recipientStaging: {
    display: 'flex',
    alignItems: 'center'
  },
  unstageRecipientBtn: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
});

function ListForm(props) {
  const { classes, file, setFile, recipientData, setRecipientData } = props;

  const handleSubmit = e => {};

  const handleRecipientSubmit = e => {
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

  const importCSV = () => {
    BigPapa.parse(file.content, {
      header: true,
      complete: function(results, file) {
        console.log('Parsing complete:', results, file);
        setRecipientData(results.data);
      }
    });
  };

  const [recipient, setRecipient] = useState({
    email: '',
    first_name: '',
    last_name: ''
  });

  const handleClassChange = ({ target: { name, value } }) => {
    props.setListData({
      ...props.listData,
      [name]: value
    });
  };

  const handleRecipientChange = e => {
    e.preventDefault();
    setRecipient({
      ...recipient,
      [e.target.name]: e.target.value
    });
  };

  const handleFile = ({ target: { files } }) => {
    console.log(files[0]);
    setFile({ content: files[0], filename: files[0].name });
  };

  const handleCheckBox = () => {
    const googleProfile = JSON.parse(localStorage.getItem('profile'));
    const teacherInfo = {
      email: googleProfile.email,
      first_name: googleProfile.given_name,
      last_name: googleProfile.family_name
    };
    props.setListData({
      ...props.listData,
      ccBool: !props.listData.ccBool
    });
    if (!recipientData.some(r => r.email === teacherInfo.email)) {
      props.setRecipientData(recipientData.concat(teacherInfo));
    } else {
      const recipientFiltered = recipientData.filter(
        r => r.email !== teacherInfo.email
      );
      props.setRecipientData(recipientFiltered);
    }
  };

  const handleNext = e => {
    e.preventDefault();
    props.setStage({
      ...props.stage,
      onListForm: !props.stage.onListForm,
      onCampaignForm: !props.stage.onCampaignForm
    });
  };

  const unstageRecipient = (e, targetEmail) => {
    e.preventDefault();
    const filteredArr = props.recipientData.filter(
      r => r.email !== targetEmail
    );
    setRecipientData(filteredArr);
  };

  return (
    <Paper className={classes.container} elevation={24}>
      <Typography
        variant="h6"
        color="secondary"
        style={{ textAlign: 'center' }}
      >
        Add Class
      </Typography>

      <hr className={classes.hrStyle} />

      <Typography variant="body1" color="secondary" style={{ textAlign: 'center' }}>
        Class Name
      </Typography>

      <FormGroup className={classes.form1} onSubmit={handleSubmit}>
        <Input
          disableUnderline
          onChange={handleClassChange}
          name="classnameInput"
          required
          placeholder="Classname"
          className={classes.input1}
        />
        <FormControlLabel
          className={classes.checkboxDiv}
          label="CC Me"
          color="secondary"
          control={
            <Checkbox
              type="checkbox"
              name="checkbox"
              className={classes.checkbox}
              checked={props.listData.ccBool}
              onChange={handleCheckBox}
            />
          }
        />
      </FormGroup>

      <hr className={classes.hrStyle} />

      <Typography variant="body1" color="secondary" style={{ textAlign: 'center' }}>
        CSV File
      </Typography>

      <div className={classes.form2}>
        <Button
          className={classes.uploadInput}
          variant="contained"
          component="label"
        >
          <input
            hidden
            type="file"
            name="filename"
            onChange={handleFile}
            placeholder={null}
          />
          <Attachment />
          <Typography
            variant="subtitle1"
            color="primary"
            className={classes.inputFont}
          >
            {file.filename}
          </Typography>
        </Button>
        <Fab
          elevation={20}
          aria-label="Upload"
          onClick={importCSV}
          className={classes.btn}
        >
          <CloudUpload />
        </Fab>
      </div>

      <hr className={classes.hrStyle} />

      <Typography variant="body1" color="secondary" style={{ textAlign: 'center' }}>
        Recipient Name
      </Typography>

      <form className={classes.form3} onSubmit={e => handleRecipientSubmit(e)}>
        <Input
          className={classes.input3}
          name="email"
          type="email"
          variant="outlined"
          value={recipient.email}
          placeholder="Email"
          onChange={e => handleRecipientChange(e)}
          disableUnderline
          required
        />
        <Input
          className={classes.input3}
          name="first_name"
          type="text"
          variant="outlined"
          value={recipient.first_name}
          placeholder="First name"
          onChange={e => handleRecipientChange(e)}
          required
        />
        <Input
          className={classes.input3}
          name="last_name"
          type="text"
          variant="outlined"
          value={recipient.last_name}
          placeholder="Last name"
          onChange={e => handleRecipientChange(e)}
          required
        />

        <Fab
          elevation={24}
          aria-label="Add Recipient"
          className={classes.btn3}
          type="submit"
        >
          <GroupAdd />
        </Fab>
      </form>

      <hr className={classes.hrStyle} />

      {recipientData.length > 0 ? (
        recipientData.map((recipient, i) => (
          <div key={i} className={classes.recipientStaging}>
            <p style={{ color: 'white' }}>
              {i + 1}. {recipient.first_name} {recipient.last_name} (
              {recipient.email}) &nbsp;
            </p>
            <RemoveCircleOutline
              className={classes.unstageRecipientBtn}
              tooltip="Remove selected recipient"
              onClick={e => unstageRecipient(e, recipient.email)}
            />
          </div>
        ))
      ) : (
        <p>You need to add new recipients.</p>
      )}

      <hr className={classes.hrStyle} />

      <div className={classes.csvDiv}>
        <Typography
          variant="body2"
          color="secondary"
          className={classes.nextText}
        >
          NEXT
        </Typography>
        <Fab elevation={20} aria-label="Upload" className={classes.btn}>
          <ArrowForward onClick={e => handleNext(e)} />
        </Fab>
      </div>
    </Paper>
  );
}

export default withStyles(styles, { withTheme: true })(ListForm);
