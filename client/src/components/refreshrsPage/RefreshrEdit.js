import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  FormGroup,
  withStyles,
  Button,
  Paper,
  Input,
  Snackbar,
  IconButton
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

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
  hidden: {
    display: 'none'
  },
  edit: {
    display: 'flex',
    wrap: 'nowrap',
    margin: '15px 0px',
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    cursor: 'pointer',
    height: '10px'
  },
  hrStyle: {
    margin: '1rem auto',
    width: '100%'
  },
  editIcon: {
    margin: '0%',
    paddingLeft: '1%'
  }
});

function Refreshr(props) {
  const { match, updateRefreshrDB, token } = props;
  const [refreshrName, setRefreshrName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [questionTextOne, setQuestionTextOne] = useState({ text: '', id: '' });
  const [questionTextTwo, setQuestionTextTwo] = useState({ text: '', id: '' });
  const [a1Text, setA1Text] = useState('');
  const [a2Text, setA2Text] = useState('');
  const [a3Text, setA3Text] = useState('');
  const [a4Text, setA4Text] = useState('');
  const [refreshrNameEdit, setRefreshrNameEdit] = useState(false);
  const [reviewEdit, setReviewEdit] = useState(false);
  const [multiChoiceEdit, setMultiChoiceEdit] = useState(false);
  const [q2Edit, setQ2Edit] = useState(false);
  const [questionObject, setQuestionObject] = useState({
    reviewText,
    refreshrName,
    questionTextOne,
    questionTextTwo,
    answers: { a1Text, a2Text, a3Text, a4Text }
  });
  const typeformId = match.params.id;

  const [updateSnackBool, setUpdateSnackBool] = useState(false);

  const headers = {
    Authorization: `Bearer ${process.env.REACT_APP_TYPEFORM}`
  };

  useEffect(() => {
    axios({
      method: 'get',
      //DEVELOPMENT
      url: `http://localhost:9000/refreshrs/${typeformId}`,
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        // console.log('res from useEffect', res);
        // const answers = res.data.fields[1].properties.choices.map(
        //   answer => answer.label
        console.log('FROM USE EFFECT', res);
        setRefreshrName(res.data.refreshr.name);
        setReviewText(res.data.refreshr.review_text);
        setA1Text(res.data.refreshr.questions[0].question.answer_1);
        setA2Text(res.data.refreshr.questions[0].question.answer_2);
        setA3Text(res.data.refreshr.questions[0].question.answer_3);
        setA4Text(res.data.refreshr.questions[0].question.answer_4);
        setQuestionTextOne({
          text: res.data.refreshr.questions[0].question.question_text,
          id: res.data.refreshr.questions[0].question_id
        });
        setQuestionTextTwo({
          text: res.data.refreshr.questions[1].question.question_text,
          id: res.data.refreshr.questions[1].question_id
        });
      })
      .catch(err => console.log(err));
  }, []);

  const editForm = async event => {
    event.preventDefault();
    console.log('IN update!');
    console.log('refreshrName =>', refreshrName);
    console.log('questionTextOne.text =>', questionTextOne.text);
    console.log('reviewText =>', reviewText);
    console.log('a1Text =>', a1Text);
    console.log('questionTextTwo.text =>', questionTextTwo.text);

    const data = {
      title: refreshrName,
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
          title: questionTextOne.text,
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
          title: questionTextTwo.text,
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
          console.log(res.data.id, match.params.id);
          const updatedRefreshr = {
            name: res.data.title,
            review_text: res.data.fields[1].properties.description,
            typeform_id: res.data.id,
            typeform_url: res.data._links.display
          };
          console.log(questionObject);
          updateRefreshrDB(updatedRefreshr, typeformId, questionObject);
        });
    } catch (error) {
      console.log(error);
    }
  };
  // }

  const handleUpdateSnackBool = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setUpdateSnackBool(!updateSnackBool);
  };

  console.log('refreshrName pre-render =>', refreshrName);

  return (
    <Paper className={props.classes.container} elevation={24}>
      <Grid className={props.classes.wrapper}>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={updateSnackBool}
          autoHideDuration={4000}
          onClose={handleUpdateSnackBool}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">Refreshr Updated!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={handleUpdateSnackBool}
            >
              <Close />
            </IconButton>
          ]}
        />
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
              <h4 className={props.classes.editIcon}>Edit</h4>
            </FormGroup>
          </FormGroup>

          <hr className={props.classes.hrStyle} />

          <h4 className={props.classes.subheaders}>Your Review Text</h4>

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
            <FormGroup
              onClick={() => setReviewEdit(!reviewEdit)}
              className={props.classes.edit}
            >
              <i className="fas fa-pen" />
              <h4 className={props.classes.editIcon}>Edit</h4>
            </FormGroup>
          </FormGroup>

          <hr className={props.classes.hrStyle} />

          <h4 className={props.classes.subheaders}>Your Questions</h4>

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
            <Typography
              className={
                multiChoiceEdit ? props.classes.hidden : props.classes.editText
              }
            >
              {questionTextOne.text}
            </Typography>
            <Input
              disableUnderline
              onChange={e =>
                setQuestionTextOne({ ...questionTextOne, text: e.target.value })
              }
              name="classnameInput"
              required
              multiline
              rows="4"
              value={questionTextOne.text}
              className={
                multiChoiceEdit
                  ? props.classes.inputQuestion
                  : props.classes.hidden
              }
            />
            {/* <FormGroup
              onClick={() => setMultiChoiceEdit(!multiChoiceEdit)}
              className={props.classes.edit}
            >
              <i className="fas fa-pen" />
              <h4 className={props.classes.editText}>Edit</h4>
            </FormGroup> */}
          </FormGroup>

          <FormGroup
          // className={
          //   multiChoiceEdit
          //     ? props.classes.hidden
          //     : props.classes.inputMultipleChoice
          // }
          >
            {/* <FormGroup
              className={
                multiChoiceEdit
                  ? props.classes.hidden
                  : props.classes.inputMultipleChoice
              }
            > */}
            {/* </FormGroup> */}
            <Typography
              style={{
                textAlign: 'center',
                width: '100%'
              }}
              className={
                multiChoiceEdit ? props.classes.hidden : props.classes.editText
              }
            >
              {a1Text}
            </Typography>
            <Typography
              style={{
                textAlign: 'center',
                width: '100%'
              }}
              className={
                multiChoiceEdit ? props.classes.hidden : props.classes.editText
              }
            >
              {a2Text}
            </Typography>
            <Typography
              style={{
                textAlign: 'center',
                width: '100%'
              }}
              className={
                multiChoiceEdit ? props.classes.hidden : props.classes.editText
              }
            >
              {a3Text}
            </Typography>
            <Typography
              style={{
                textAlign: 'center',
                width: '100%'
              }}
              className={
                multiChoiceEdit ? props.classes.hidden : props.classes.editText
              }
            >
              {a4Text}
            </Typography>
            {/* </FormGroup> */}
            <form className={props.classes.multipleChoice}>
              <Input
                disableUnderline
                onChange={e => setA1Text(e.target.value)}
                name="classnameInput"
                required
                value={a1Text}
                className={
                  multiChoiceEdit
                    ? props.classes.inputMultipleChoice
                    : props.classes.hidden
                }
              />
              <Input
                disableUnderline
                name="classnameInput"
                onChange={e => setA2Text(e.target.value)}
                required
                value={a2Text}
                className={
                  multiChoiceEdit
                    ? props.classes.inputMultipleChoice
                    : props.classes.hidden
                }
              />
              <Input
                disableUnderline
                onChange={e => setA3Text(e.target.value)}
                name="classnameInput"
                required
                value={a3Text}
                className={
                  multiChoiceEdit
                    ? props.classes.inputMultipleChoice
                    : props.classes.hidden
                }
              />
              <Input
                disableUnderline
                onChange={e => setA4Text(e.target.value)}
                name="classnameInput"
                required
                value={a4Text}
                className={
                  multiChoiceEdit
                    ? props.classes.inputMultipleChoice
                    : props.classes.hidden
                }
              />
            </form>
          </FormGroup>
          <FormGroup
            onClick={() => setMultiChoiceEdit(!multiChoiceEdit)}
            className={props.classes.edit}
          >
            <i className="fas fa-pen" />
            <h4 className={props.classes.editIcon}>Edit</h4>
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
            <Typography
              className={q2Edit ? props.classes.hidden : props.classes.editText}
            >
              {questionTextTwo.text}
            </Typography>
            <Input
              disableUnderline
              name="classnameInput"
              onChange={e =>
                setQuestionTextTwo({ ...questionTextTwo, text: e.target.value })
              }
              required
              multiline
              rows="4"
              value={questionTextTwo.text}
              // className={props.classes.inputQuestion}
              className={
                q2Edit ? props.classes.inputQuestion : props.classes.hidden
              }
            />
            <FormGroup
              onClick={() => setQ2Edit(!q2Edit)}
              className={props.classes.edit}
            >
              <i className="fas fa-pen" />
              <h4 className={props.classes.editIcon}>Edit</h4>
            </FormGroup>
          </FormGroup>

          <hr className={props.classes.hrStyle} />
          <Button
            variant="contained"
            color="primary"
            onClick={e => {
              editForm(e);
              handleUpdateSnackBool();
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
