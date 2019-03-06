import React, { useState } from 'react';
import {
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
  TextField,
  withStyles,
  Button,
  Card,
  Paper,
  Fab,
  Input
} from '@material-ui/core';
import styled from 'styled-components';

const axios = require('axios');

// const styles = theme => ({
//   wrapper: {
//     margin: '2rem auto',
//     borderRadius: '0 0 5px 5px',
//     width: '600px',
//     background: 'white'
//   },
//   refreshrName: {
//     maxWidth: '250px',
//     width: '100%',
//     height: '100%',
//     maxHeight: '35px'
//   },
//   formGroup: {
//     maxHeight: '120px', // needed for 4 question look on balsamic
//     marginLeft: '1rem',
//     marginBottom: '1rem'
//   },
//   subheaders: {
//     marginTop: '.5rem'
//   },
//   answerFields: {
//     height: '100%',
//     width: '100%',
//     maxWidth: '160px',
//     maxHeight: '28px'
//   }
// });

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
    [theme.breakpoints.down('sm')]: {
      width: '80%'
    },
    [theme.breakpoints.only('md')]: {
      width: '60%'
    },
    width: '50%'
  },
  textField: {
    // background: theme.palette.secondary.main,
    background: '#FFFFFF',
    borderRadius: 5,
    // margin: '5% 10%'
    width: '80%'
  },
  inputName: {
    marginBottom: theme.spacing.unit,
    padding: '.75%',
    paddingLeft: 14,
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    fontSize: '1em',
    width: '75%',
    borderRadius: 5
  },
  inputQuestion: {
    marginBottom: theme.spacing.unit,
    padding: '.75%',
    paddingLeft: 14,
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    fontSize: '1em',
    width: '75%',
    borderRadius: 5
  },
  input2: {
    marginBottom: theme.spacing.unit,
    padding: '.75%',
    paddingLeft: 14,
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    fontSize: '1em',
    width: '100%',
    borderRadius: 5
  },
  multipleChoice: {
    margin: '3% 1%',
    padding: '2% 10%',
    // background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    fontSize: '1em',
    borderRadius: 5,
    width: '100%'
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
    // width: '90%',
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
    justifyContent: 'space-evenly'
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
    width: 65,
    height: 40,
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
    margin: '0 1rem',
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
  }
});

function Refreshr(props) {
  const { setUrl, url } = props;
  const [refreshrName, addRefreshrName] = useState('');
  const [questionTextOne, setQuestionTextOne] = useState('');
  const [questionTextTwo, setQuestionTextTwo] = useState('');
  const [a1, setA1] = useState(false);
  const [a2, setA2] = useState(false);
  const [a3, setA3] = useState(false);
  const [a4, setA4] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [a1Text, setA1Text] = useState('');
  const [a2Text, setA2Text] = useState('');
  const [a3Text, setA3Text] = useState('');
  const [a4Text, setA4Text] = useState('');
  const [questionObject, setQuestionObject] = useState({
    refreshrName,
    questionTextOne,
    questionTextTwo,
    answers: { a1Text, a1, a2Text, a2, a3Text, a3, a4Text, a4 }
  });

  const StyleDisplay = styled.a`
    ${{ display: submitted ? 'block' : 'none' }}
  `;

  const createForm = async event => {
    event.preventDefault();
    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_TYPEFORM}`
    };
    const data = {
      title: questionObject.refreshrName,
      variables: {
        score: 0
      },
      fields: [
        {
          title: 'Please enter your email address.',
          type: 'email',
          validations: {
            required: true
          }
        },
        {
          ref: 'question_1',
          title: questionObject.questionTextOne,
          type: 'multiple_choice',
          properties: {
            randomize: true,
            choices: [
              {
                ref: 'correct',
                label: questionObject.answers.a1Text
              },
              {
                ref: 'incorrect_1',
                label: questionObject.answers.a2Text
              },
              {
                ref: 'incorrect_2',
                label: questionObject.answers.a3Text
              },
              {
                ref: 'incorrect_3',
                label: questionObject.answers.a4Text
              }
            ]
          }
        },
        {
          ref: 'question_2',
          title: questionObject.questionTextTwo,
          type: 'short_text'
        }
      ]
    };
    try {
      const response = await axios.post(
        'https://api.typeform.com/forms',
        data,
        {
          headers
        }
      );
      setUrl(response.data._links.display);
    } catch (error) {
      console.log(error);
    }
    setSubmitted(true);
  };

  console.log('REFRESHR NAME', refreshrName);

  return (
    <Paper className={props.classes.container} elevation={24}>
      <Grid className={props.classes.wrapper}>
        <FormGroup
          onChange={() =>
            setQuestionObject({
              refreshrName,
              questionTextOne,
              questionTextTwo,
              answers: { a1Text, a1, a2Text, a2, a3Text, a3, a4Text, a4 }
            })
          }
        >
          <Typography
            variant="h6"
            color="secondary"
            style={{ textAlign: 'center' }}
          >
            Create Your Refreshr
          </Typography>

          <hr className={props.classes.hrStyle} />

          <Typography
            variant="p"
            color="secondary"
            style={{ textAlign: 'center' }}
          >
            Refreshr Name
          </Typography>

          <FormGroup
            className={props.classes.form1}
            onSubmit={props.handleSubmit}
          >
            <Input
              disableUnderline
              onChange={e => addRefreshrName(e.target.value)}
              name="classnameInput"
              required
              placeholder="Enter Refreshr Name.."
              className={props.classes.inputName}
            />
          </FormGroup>

          <hr className={props.classes.hrStyle} />

          {/* <TextField
            value={refreshrName}
            label="Refreshr Name"
            name="refreshrName"
            className={props.classes.refreshrName}
            placeholder="Refreshr Name"
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            onChange={e => addRefreshrName(e.target.value)}
          /> */}
          <h4 className={props.classes.subheaders}>Create Questions</h4>

          <Typography
            variant="p"
            color="secondary"
            style={{ textAlign: 'center' }}
          >
            Question 1: Multiple Choice
          </Typography>
          <FormGroup
            className={props.classes.form1}
            onSubmit={props.handleSubmit}
          >
            {/* <TextField
              id="filled-multiline-static"
              multiline
              rows="2"
              placeholder="Enter question.."
              className={props.classes.textField}
              margin="normal"
              variant="filled"
            /> */}
            <Input
              disableUnderline
              onChange={e => setQuestionTextOne(e.target.value)}
              name="classnameInput"
              required
              multiline
              rows="4"
              placeholder="Enter question.."
              className={props.classes.input2}
            />
          </FormGroup>
          {/* <FormGroup
            className={props.classes.form1}
            onSubmit={props.handleSubmit}
          >
            <Input
              disableUnderline
              // onChange={e => addRefreshrName(e.target.value)}
              onChange={e => setQuestionTextOne(e.target.value)}
              name="classnameInput"
              required
              placeholder="Enter question.."
              className={props.classes.inputQuestion}
            />
          </FormGroup> */}

          <FormGroup>
            <form className={props.classes.multipleChoice}>
              <Input
                disableUnderline
                // onChange={e => addRefreshrName(e.target.value)}
                onChange={e => setA1Text(e.target.value)}
                name="classnameInput"
                required
                placeholder="Answer one.."
                className={props.classes.input2}
              />
              <Input
                disableUnderline
                // onChange={e => addRefreshrName(e.target.value)}
                // onChange={e => setA4Text(e.target.value)}
                name="classnameInput"
                onChange={e => setA2Text(e.target.value)}
                required
                placeholder="Answer two.."
                className={props.classes.input2}
              />
              <Input
                disableUnderline
                // onChange={e => addRefreshrName(e.target.value)}
                onChange={e => setA3Text(e.target.value)}
                name="classnameInput"
                required
                placeholder="Answer three.."
                className={props.classes.input2}
              />
              <Input
                disableUnderline
                // onChange={e => addRefreshrName(e.target.value)}
                onChange={e => setA4Text(e.target.value)}
                name="classnameInput"
                required
                placeholder="Answer four.."
                className={props.classes.input2}
              />
            </form>
          </FormGroup>

          <hr className={props.classes.hrStyle} />

          <Typography
            variant="p"
            color="secondary"
            style={{ textAlign: 'center' }}
          >
            Question 2: Text Response
          </Typography>

          <FormGroup
            className={props.classes.form1}
            onSubmit={props.handleSubmit}
          >
            {/* <Input
              disableUnderline
              // onChange={e => addRefreshrName(e.target.value)}
              onChange={e => setQuestionTextTwo(e.target.value)}
              name="classnameInput"
              required
              placeholder="Enter question.."
              className={props.classes.inputQuestion}
            /> */}
            {/* <TextField
              id="filled-multiline-static"
              multiline
              rows="2"
              placeholder="Enter question.."
              className={props.classes.textField}
              margin="normal"
              variant="filled"
            /> */}
            <Input
              disableUnderline
              name="classnameInput"
              onChange={e => setQuestionTextTwo(e.target.value)}
              required
              multiline
              rows="4"
              placeholder="Enter question.."
              className={props.classes.input2}
            />
          </FormGroup>

          <hr className={props.classes.hrStyle} />

          {/* <TextField
            placeholder="Enter your multiple choice question here.."
            label="Question 1"
            name="question"
            multiline
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            onChange={e => setQuestionTextOne(e.target.value)}
          />
          <FormGroup className={props.classes.formGroup}>
            <FormControlLabel
              control={
                <>
                  <Checkbox
                    checked={a1}
                    color="primary"
                    onChange={e => setA1(e.target.checked)}
                  />
                  <TextField
                    variant="outlined"
                    label="Answer 1"
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={a1Text}
                    className={props.classes.answerFields}
                    onChange={e => setA1Text(e.target.value)}
                  />
                </>
              }
            />
            <FormControlLabel
              control={
                <>
                  <Checkbox
                    checked={a2}
                    color="primary"
                    onChange={e => setA2(e.target.checked)}
                  />
                  <TextField
                    variant="outlined"
                    label="Answer 2"
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={a2Text}
                    className={props.classes.answerFields}
                    onChange={e => setA2Text(e.target.value)}
                  />
                </>
              }
            />
            <FormControlLabel
              control={
                <>
                  <Checkbox
                    checked={a3}
                    color="primary"
                    onChange={e => setA3(e.target.checked)}
                  />
                  <TextField
                    variant="outlined"
                    label="Answer 3"
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={a3Text}
                    className={props.classes.answerFields}
                    onChange={e => setA3Text(e.target.value)}
                  />
                </>
              }
            />
            <FormControlLabel
              control={
                <>
                  <Checkbox
                    checked={a4}
                    color="primary"
                    onChange={e => setA4(e.target.checked)}
                  />
                  <TextField
                    variant="outlined"
                    label="Answer 4"
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={a4Text}
                    className={props.classes.answerFields}
                    onChange={e => setA4Text(e.target.value)}
                  />
                </>
              }
            />
          </FormGroup>
          <TextField
            placeholder="Enter your text-response question here.."
            label="Question 2"
            name="question"
            multiline
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            onChange={e => setQuestionTextTwo(e.target.value)}
          /> */}
          <Button
            variant="contained"
            color="primary"
            onClick={e => {
              props.addQuestions(questionObject);
              createForm(e);
            }}
          >
            Submit
          </Button>
          <StyleDisplay>View your Refreshr here: {url}</StyleDisplay>
        </FormGroup>
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(Refreshr);
