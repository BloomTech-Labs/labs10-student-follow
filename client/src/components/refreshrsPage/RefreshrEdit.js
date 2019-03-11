import React, { useState, useEffect } from 'react';
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
    [theme.breakpoints.only('sm')]: {
      width: '60vw'
    },
    [theme.breakpoints.only('xs')]: {
      width: '90vw'
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
  const [typeformWelcome, setTypefromWelcome] = useState([]);
  const [typeformQ1Props, setTypeformQ1Props] = useState([]);
  const [typeformAnswers, setTypeformAnswers] = useState([]);
  const [typeformQ1, setTypeformQ1] = useState([]);
  const [typeformQ2, setTypeformQ2] = useState([]);

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
  const typeformId = window.location.pathname.slice(-6);

  const StyleDisplay = styled.a`
    ${{ display: submitted ? 'block' : 'none' }}
  `;

  const headers = {
    Authorization: `Bearer ${process.env.REACT_APP_TYPEFORM}`
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://api.typeform.com/forms/${typeformId}`,
      headers: { Authorization: `Bearer ${process.env.REACT_APP_TYPEFORM}` }
    })
      .then(res => {
        console.log('FROM USE EFFECT', res);
        setTypefromWelcome(res.data.welcome_screens[0]);
        setTypeformQ1Props(res.data.fields[1].properties);
        setTypeformAnswers(res.data.fields[1].properties.choices);
        setTypeformQ1(res.data.fields[1]);
        setTypeformQ2(res.data.fields[2]);
      })
      .catch(err => console.log(err));
  }, []);

  const { userClasses, classes, userRefreshrs, questions } = props;
  const answers = typeformAnswers.map(answer => answer.label);
  // console.log('typeformText =>', typeformAnswers.map(answer => answer.label));

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
            Edit Your Refreshr
          </Typography>

          <hr className={props.classes.hrStyle} />

          <Typography
            variant="body1"
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
              type="text"
              value={typeformWelcome.title}
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
              // placeholder="Enter info about the Refreshr.."
              value={typeformQ1Props.description}
              className={props.classes.inputQuestion}
            />
          </FormGroup>

          <hr className={props.classes.hrStyle} />

          <h4 className={props.classes.subheaders}>Create Questions</h4>

          <Typography
            variant="body1"
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
                value={answers[0]}
                // placeholder="Answer one.."
                className={props.classes.inputMultipleChoice}
              />
              <Input
                disableUnderline
                name="classnameInput"
                onChange={e => setA2Text(e.target.value)}
                required
                // placeholder="Answer two.."
                value={answers[1]}
                className={props.classes.inputMultipleChoice}
              />
              <Input
                disableUnderline
                onChange={e => setA3Text(e.target.value)}
                name="classnameInput"
                required
                // placeholder="Answer three.."
                value={answers[2]}
                className={props.classes.inputMultipleChoice}
              />
              <Input
                disableUnderline
                onChange={e => setA4Text(e.target.value)}
                name="classnameInput"
                required
                // placeholder="Answer four.."
                value={answers[3]}
                className={props.classes.inputMultipleChoice}
              />
            </form>
          </FormGroup>

          <hr className={props.classes.hrStyle} />

          <Typography
            variant="body1"
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
