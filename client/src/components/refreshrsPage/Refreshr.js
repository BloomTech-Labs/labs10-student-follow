import React, { useState } from 'react';
import {
  Grid,
  Typography,
  FormGroup,
  withStyles,
  Button,
  Paper,
  Input
} from '@material-ui/core';
import styled from 'styled-components';

const axios = require('axios');

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
    [theme.breakpoints.down('md')]: {
      width: '60%',
      marginLeft: '20%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '60%',
      marginLeft: '15%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginLeft: '10%'
    },
    width: '50%'
  },
  textField: {
    background: '#FFFFFF',
    borderRadius: 5,
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
    padding: '5%',
    paddingLeft: 14,
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    fontSize: '1em',
    width: '75%',
    borderRadius: 5
  },
  inputMultipleChoice: {
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
    color: theme.palette.primary.main,
    fontSize: '1em',
    borderRadius: 5,
    width: '100%'
  },
  form1: {
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'column nowrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: theme.spacing.unit * 2
  },
  hrStyle: {
    margin: '1rem auto',
    width: '100%'
  }
});

function Refreshr(props) {
  const { setUrl, url } = props;
  const [reviewText, setReviewText] = useState('');
  const [refreshrName, addRefreshrName] = useState('');
  const [questionTextOne, setQuestionTextOne] = useState('');
  const [questionTextTwo, setQuestionTextTwo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [a1Text, setA1Text] = useState('');
  const [a2Text, setA2Text] = useState('');
  const [a3Text, setA3Text] = useState('');
  const [a4Text, setA4Text] = useState('');
  const [questionObject, setQuestionObject] = useState({
    reviewText,
    refreshrName,
    questionTextOne,
    questionTextTwo,
    answers: { a1Text, a2Text, a3Text, a4Text }
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
      welcome_screens: [
        {
          title: 'Welcome to your Refreshr!',
          properties: {
            description: questionObject.reviewText
          }
        }
      ],
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

  return (
    <Paper className={props.classes.container} elevation={24}>
      <Grid className={props.classes.wrapper}>
        <FormGroup
          onChange={() =>
            setQuestionObject({
              reviewText,
              refreshrName,
              questionTextOne,
              questionTextTwo,
              answers: { a1Text, a2Text, a3Text, a4Text }
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

          <h4 className={props.classes.subheaders}>Add Review Text</h4>

          <FormGroup
            className={props.classes.form1}
            onSubmit={props.handleSubmit}
          >
            <Input
              disableUnderline
              onChange={e => setReviewText(e.target.value)}
              name="classnameInput"
              required
              multiline
              rows="4"
              placeholder="Enter info about the Refreshr.."
              className={props.classes.inputQuestion}
            />
          </FormGroup>

          <hr className={props.classes.hrStyle} />

          <h4 className={props.classes.subheaders}>Create Questions</h4>

          <Typography
            variant="p"
            color="secondary"
            style={{ textAlign: 'center' }}
          >
            Question 1: Multiple Choice Response
          </Typography>
          <FormGroup
            className={props.classes.form1}
            onSubmit={props.handleSubmit}
          >
            <Input
              disableUnderline
              onChange={e => setQuestionTextOne(e.target.value)}
              name="classnameInput"
              required
              multiline
              rows="4"
              placeholder="Enter question.."
              className={props.classes.inputQuestion}
            />
          </FormGroup>

          <FormGroup>
            <form className={props.classes.multipleChoice}>
              <Input
                disableUnderline
                onChange={e => setA1Text(e.target.value)}
                name="classnameInput"
                required
                placeholder="Answer one.."
                className={props.classes.inputMultipleChoice}
              />
              <Input
                disableUnderline
                name="classnameInput"
                onChange={e => setA2Text(e.target.value)}
                required
                placeholder="Answer two.."
                className={props.classes.inputMultipleChoice}
              />
              <Input
                disableUnderline
                onChange={e => setA3Text(e.target.value)}
                name="classnameInput"
                required
                placeholder="Answer three.."
                className={props.classes.inputMultipleChoice}
              />
              <Input
                disableUnderline
                onChange={e => setA4Text(e.target.value)}
                name="classnameInput"
                required
                placeholder="Answer four.."
                className={props.classes.inputMultipleChoice}
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
            <Input
              disableUnderline
              name="classnameInput"
              onChange={e => setQuestionTextTwo(e.target.value)}
              required
              multiline
              rows="4"
              placeholder="Enter question.."
              className={props.classes.inputQuestion}
            />
          </FormGroup>

          <hr className={props.classes.hrStyle} />

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
