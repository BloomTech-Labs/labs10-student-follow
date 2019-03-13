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
  editText: {
    marginBottom: theme.spacing.unit,
    padding: '.75%',
    paddingLeft: 14,
    // background: theme.palette.secondary.main,
    background: 'yellow',
    color: theme.palette.primary.main,
    fontSize: '1em',
    width: '75%',
    borderRadius: 5,
    border: '2px solid yellow'
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
  hidden: {
    display: 'none'
  },
  edit: {
    display: 'flex',
    wrap: 'nowrap',
    marginTop: '2%',
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
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
  const [refreshrName, setRefreshrName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [questionTextOne, setQuestionTextOne] = useState('');
  const [questionTextTwo, setQuestionTextTwo] = useState('');
  const [a1Text, setA1Text] = useState('');
  const [a2Text, setA2Text] = useState('');
  const [a3Text, setA3Text] = useState('');
  const [a4Text, setA4Text] = useState('');
  const [refreshrNameEdit, setRefreshrNameEdit] = useState(false);
  const [reviewEdit, setReviewEdit] = useState(false);
  const [questionObject, setQuestionObject] = useState({
    reviewText,
    refreshrName,
    questionTextOne,
    questionTextTwo,
    answers: { a1Text, a2Text, a3Text, a4Text }
  });
  const typeformId = window.location.pathname.slice(-6);

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
        const answers = res.data.fields[1].properties.choices.map(
          answer => answer.label
        );
        console.log('FROM USE EFFECT', res);
        setRefreshrName(res.data.welcome_screens[0].title);
        setReviewText(res.data.fields[1].properties.description);
        setA1Text(answers[0]);
        setA2Text(answers[1]);
        setA3Text(answers[2]);
        setA4Text(answers[3]);
        setQuestionTextOne(res.data.fields[1].title);
        setQuestionTextTwo(res.data.fields[2].title);
      })
      .catch(err => console.log(err));
  }, []);

  const editForm = async event => {
    event.preventDefault();
    console.log('IN update!');
    const data = {
      title: 'Refreshr',
      variables: {
        score: 0
      },
      welcome_screens: [
        {
          title: refreshrName
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
          title: questionTextOne,
          type: 'multiple_choice',
          properties: {
            description: reviewText,
            randomize: true,
            choices: [
              {
                ref: 'correct',
                label: a1Text
              },
              {
                ref: 'incorrect_1',
                label: a2Text
              },
              {
                ref: 'incorrect_2',
                label: a3Text
              },
              {
                ref: 'incorrect_3',
                label: a4Text
              }
            ]
          }
        },
        {
          ref: 'question_2',
          title: questionTextTwo,
          type: 'short_text',
          properties: {
            description: reviewText
          }
        }
      ]
    };
    try {
      await axios
        .put(`https://api.typeform.com/forms/${typeformId}`, data, {
          headers
        })
        .then(res => {
          const newRefreshr = {
            name: res.data.title,
            review_text: res.data.fields[1].properties.description,
            typeform_id: res.data.id,
            typeform_url: res.data._links.display
          };
          props.sendRefreshrToDB(newRefreshr);
        });
    } catch (error) {
      console.log(error);
    }
    // handleSnackbar();
    //setSubmitted(true);
  };
  // }

  console.log('reviewText + => ', reviewText);
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
            <Typography
              className={
                refreshrNameEdit ? props.classes.hidden : props.classes.editText
              }
            >
              {refreshrName}
            </Typography>
            <Input
              disableUnderline
              onChange={e => setRefreshrName(e.target.value)}
              name="classnameInput"
              required
              type="text"
              value={refreshrName}
              className={
                refreshrNameEdit
                  ? props.classes.inputName
                  : props.classes.hidden
              }
            />
            <FormGroup
              onClick={() => setRefreshrNameEdit(!refreshrNameEdit)}
              className={props.classes.edit}
            >
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
            <Typography
              className={
                reviewEdit ? props.classes.hidden : props.classes.editText
              }
            >
              {reviewText}
            </Typography>
            <Input
              disableUnderline
              onChange={e => setReviewText(e.target.value)}
              name="classnameInput"
              required
              multiline
              rows="4"
              value={reviewText}
              className={
                reviewEdit ? props.classes.inputQuestion : props.classes.hidden
              }
            />
            <FormGroup className={props.classes.edit}>
              <i className="fas fa-pen" />
              <h4
                onClick={() => setReviewEdit(!reviewEdit)}
                className={props.classes.editText}
              >
                Edit
              </h4>
            </FormGroup>
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
              value={questionTextOne}
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
              value={questionTextTwo}
              className={props.classes.inputQuestion}
            />
          </FormGroup>

          <hr className={props.classes.hrStyle} />
          <Button
            variant="contained"
            color="primary"
            onClick={e => {
              // props.addQuestions(questionObject);
              editForm(e);
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
