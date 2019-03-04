import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, FormGroup, Fab, Input, Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import UpIcon from '@material-ui/icons/ArrowUpward';
import RightIcon from '@material-ui/icons/ArrowForward';
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
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.dark,
    [theme.breakpoints.down('sm')]: {
      width: '80%'
    },
    [theme.breakpoints.only('md')]: {
      width: '60%'
    },
    width: '50%'
  },
  input: {
    marginBottom: theme.spacing.unit,
    padding: '.75%',
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    fontSize: '1em',
    width: 200,
    borderRadius: 5,
    paddingLeft: 60,
    paddingRight: 30,
    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing.unit * 8
    }
  },
  checkboxDiv: {
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing.unit * 2
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing.unit * 6
    }
  },
  checkbox: {
    marginRight: theme.spacing.unit,
    color: theme.palette.secondary.main,
    width: 40,
    height: 40
  },
  form: {
    width: '90%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center'
    }
  },
  div: {
    width: '200px',
    display: 'flex',
    justifyContent: 'center',
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
  uploadInput: {
    display: 'flex',
    flexFlow: 'row nowrap',
    width: '200px',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.secondary.main
  },
  inputFont: {
    fontSize: '.8rem',
    whiteSpace: 'nowrap',
    marginLeft: theme.spacing.unit * 2
  },

  nextText: {
    marginRight: theme.spacing.unit * 2
  }
});

function ListForm(props) {
  // console.log('theme', props.theme);
  const { classes, file, setFile, setRecipientData } = props;

  const handleSubmit = e => { };

  const importCSV = () => {
    BigPapa.parse(file.content, {
      header: true,
      complete: function (results, file) {
        console.log('Parsing complete:', results, file);
        // setClasslist(results.data);
        setRecipientData(results.data);
      }
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    props.setListData({
      ...props.listData,
      [name]: value
    });
  };

  const handleFile = ({ target: { files } }) => {
    console.log(files[0]);
    setFile({ content: files[0], filename: files[0].name });
  };

  const handleCheckBox = () => {
    props.setListData({
      ...props.listData,
      ccBool: !props.listData.ccBool
    });
  };

  const handleNext = e => {
    e.preventDefault();
    props.setStage({
      ...props.stage,
      onListForm: !props.stage.onListForm,
      onRecipientForm: !props.stage.onRecipientForm
    });
  };
  return (
    <Paper className={classes.container} elevation={24}>
      <Typography variant="h6" color="secondary" style={{ textAlign: 'center' }}>
        Upload Classlist
      </Typography>
      <FormGroup className={classes.form}>
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
        <div className={classes.div}>
          <Fab
            elevation={20}
            aria-label="Upload"
            onClick={importCSV}
            className={classes.btn}
          >
            <UpIcon />
          </Fab>
          <Typography variant="body2" color="secondary">
            Upload
          </Typography>
        </div>
      </FormGroup>
      <FormGroup className={classes.form} onSubmit={handleSubmit}>
        <Input
          disableUnderline
          onChange={handleChange}
          name="classnameInput"
          required
          placeholder="Classname"
          className={classes.input}
        />
        <FormControlLabel
          className={classes.checkboxDiv}
          control={
            <Checkbox
              type="checkbox"
              name="checkbox"
              className={classes.checkbox}
              checked={props.listData.ccBool}
              onChange={handleCheckBox}
            />
          }
          label="CC Me"
          color="secondary"
        />
      </FormGroup>
      <div className={classes.div}>
        <Typography
          variant="body2"
          color="secondary"
          className={classes.nextText}
        >
          Next
        </Typography>
        <Fab className={classes.btn}>
          <RightIcon onClick={e => handleNext(e)} />
        </Fab>
      </div>
    </Paper>
  );
}

export default withStyles(styles, { withTheme: true })(ListForm);
