import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { queueScheduler } from 'rxjs';
import styled from 'styled-components';
import { NavLink as RouterNavLink } from 'react-router-dom';

const axios = require('axios');

const styles = theme => ({
  wrapper: {
    margin: '2rem auto',
    borderRadius: '0 0 5px 5px',
    width: '600px',
    background: 'white'
  },
  refreshrName: {
    maxWidth: '250px',
    width: '100%',
    height: '100%',
    maxHeight: '35px'
  },
  formGroup: {
    maxHeight: '120px', // needed for 4 question look on balsamic
    marginLeft: '1rem',
    marginBottom: '1rem'
  },
  subheaders: {
    marginTop: '.5rem'
  },
  answerFields: {
    height: '100%',
    width: '100%',
    maxWidth: '160px',
    maxHeight: '28px'
  }
});

function Refreshr(props) {
  const [refreshrName, addRefreshrName] = useState('');
  const [reviewText, setReviewText] = useState(
    'This is a short section of text that describes or reminds about one part of the topic. It is not intended to be a complete review of the material, just a reminder of the most important parts. This section is limited to 512 characters.'
  );
  const [questionText, setQuestionText] = useState(
    'This is a multiple choice question related to the topic. Again the goal is not to be exhaustive, just to call the material to mind. A good question will not simply call for the recollection of information, but will require the application of knowledge.'
  );
  const [a1, setA1] = useState(false);
  const [a2, setA2] = useState(false);
  const [a3, setA3] = useState(false);
  const [a4, setA4] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [url, setUrl] = useState('');
  const [a1Text, setA1Text] = useState('');
  const [a2Text, setA2Text] = useState('');
  const [a3Text, setA3Text] = useState('');
  const [a4Text, setA4Text] = useState('');
  const [questionObject, setQuestionObject] = useState({
    refreshrName,
    reviewText,
    questionText,
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
      fields: [
        {
          title: questionObject.reviewText,
          type: 'multiple_choice',
          properties: {
            choices: [
              {
                label: questionObject.answers.a1Text
              },
              {
                label: questionObject.answers.a2Text
              },
              {
                label: questionObject.answers.a3Text
              },
              {
                label: questionObject.answers.a4Text
              }
            ]
          }
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
    <Grid className={props.classes.wrapper}>
      <FormGroup
        onChange={() =>
          setQuestionObject({
            refreshrName,
            reviewText,
            questionText,
            answers: { a1Text, a1, a2Text, a2, a3Text, a3, a4Text, a4 }
          })
        }
      >
        <h2>Create Your Refreshr</h2>
        <TextField
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
        />
        {/* <h4 className={props.classes.subheaders}>Review Text</h4> */}
        {/* <TextField
          value={reviewText}
          label="Review Text"
          name="reviewText"
          multiline
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          onChange={e => setReviewText(e.target.value)}
        /> */}
        <h4 className={props.classes.subheaders}>Question</h4>
        <TextField
          value={questionText}
          label="Question"
          name="question"
          multiline
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          onChange={e => setQuestionText(e.target.value)}
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
  );
}

export default withStyles(styles)(Refreshr);
