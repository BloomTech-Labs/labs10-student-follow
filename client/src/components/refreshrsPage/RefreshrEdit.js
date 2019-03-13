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
    wrap: 'wrap-reverse',
    flexDirection: 'column',
    flexFlow: 'column nowrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: theme.spacing.unit * 2
  },
  edit: {
    display: 'flex',
    wrap: 'nowrap',
    marginTop: '2%',
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    direction: 'row',
    cursor: 'pointer'
  },
  hrStyle: {
    margin: '1rem auto',
    width: '100%'
  },
  editText: {
    margin: '0%',
    paddingLeft: '1%'
  }
});

function Refreshr(props) {
  const { setUrl, url } = props;
  const [reviewText, setReviewText] = useState('');
  const [refreshrName, setRefreshrName] = useState('');
  const [questionTextOne, setQuestionTextOne] = useState('');
  const [questionTextTwo, setQuestionTextTwo] = useState('');
  // const [submitted, setSubmitted] = useState(false);
  // const [typeformWelcome, setTypefromWelcome] = useState([]);
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

  // const StyleDisplay = styled.a`
  //   ${{ display: submitted ? 'block' : 'none' }}
  // `;

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://api.typeform.com/forms/${typeformId}`,
      headers: { Authorization: `Bearer ${process.env.REACT_APP_TYPEFORM}` }
    })
      .then(res => {
        const answers = res.data.fields[1].properties.choices.map(
          answer => answer.label
        );
        console.log('FROM USE EFFECT', res);
        setRefreshrName(res.data.welcome_screens[0]);
        setReviewText(res.data.fields[1].properties);
        setA1Text(answers[0]);
        setA2Text(answers[1]);
        setA3Text(answers[2]);
        setA4Text(answers[3]);
        // setTypeformQ1(res.data.fields[1]);
        setQuestionTextOne(res.data.fields[1]);
        setQuestionTextTwo(res.data.fields[2]);
      })
      .catch(err => console.log(err));
  }, []);

  console.log('questionTextOne + => ', questionTextOne);
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
              onChange={e => setRefreshrName(e.target.value)}
              name="classnameInput"
              required
              type="text"
              value={refreshrName.title}
              className={props.classes.inputName}
            />
            <FormGroup className={props.classes.edit}>
              <i className="fas fa-pen" />
              <h4 className={props.classes.editText}>Edit</h4>
            </FormGroup>
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
              value={reviewText.description}
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
              value={questionTextOne.title}
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
                value={a1Text}
                className={props.classes.inputMultipleChoice}
              />
              <Input
                disableUnderline
                name="classnameInput"
                onChange={e => setA2Text(e.target.value)}
                required
                value={a2Text}
                className={props.classes.inputMultipleChoice}
              />
              <Input
                disableUnderline
                onChange={e => setA3Text(e.target.value)}
                name="classnameInput"
                required
                value={a3Text}
                className={props.classes.inputMultipleChoice}
              />
              <Input
                disableUnderline
                onChange={e => setA4Text(e.target.value)}
                name="classnameInput"
                required
                value={a4Text}
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
              value={questionTextTwo.title}
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
            Update
          </Button>
          {/* <StyleDisplay>View your Refreshr here: {url}</StyleDisplay> */}
        </FormGroup>
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(Refreshr);
