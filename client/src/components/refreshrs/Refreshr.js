import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  wrapper: {
    border: '2px solid black',
    borderRadius: '3px',
    height: '90vh',
    marginLeft: '3rem',
    width: '600px',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 1rem'
  },
  studentName: {
    maxWidth: '250px',
    width: '100%',
    height: '100%',
    maxHeight: '35px'
  },
  formGroup: {
    maxHeight: '120px', // needed for 4 question look on balsamic
    marginLeft: '1rem'
  },
  subheaders: {
    marginTop: '.5rem'
  }
});

function Refreshr(props) {
  const [ studentName, addStudentName ] = useState("");
  const [ reviewText, setReviewText ] = useState("This is a short section of text that describes or reminds about one part of the topic. It is not intended to be a complete review of the material, just a reminder of the most important parts. This section is limited to 512 characters.");
  const [ questionText, setQuestionText ] = useState("This is a multiple choice question related to the topic. Again the goal is not to be exhaustive, just to call the material to mind. A good question will not simply call for the recollection of information, but will require the application of knowledge.");
  const [ a1, setA1 ] = useState(false);
  const [ a2, setA2 ] = useState(false);
  const [ a3, setA3 ] = useState(false);
  const [ a4, setA4 ] = useState(false);
  
  console.log('"state"', {studentName, reviewText, questionText, a1, a2, a3, a4}, 'Props', props)
  return (
    <Grid className={props.classes.wrapper}>
        <TextField
          value={studentName}
          label="Student Name"
          name="studentName"
          className={props.classes.studentName}
          placeholder="Your name goes here..."
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => addStudentName(e.target.value)}
        />
        <h4 className={props.classes.subheaders}>Review Text</h4>
        <TextField
          value={reviewText}
          label="Review Text"
          name="reviewText"
          multiline
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <h4 className={props.classes.subheaders}>Question</h4>
        <TextField
          value={questionText}
          label="Question"
          name="question"
          multiline
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <FormGroup className={props.classes.formGroup}>
          <FormControlLabel
            control={
              <Checkbox checked={a1} onChange={(e) => setA1(e.target.checked)}/>
            }
            label="Answer 1"
          />
          <FormControlLabel
            control={
              <Checkbox checked={a2} onChange={(e) => setA2(e.target.checked)}/>
            }
            label="Answer 2"
          />
          <FormControlLabel
            control={
              <Checkbox checked={a3} onChange={(e) => setA3(e.target.checked)}/>
            }
            label="Answer 3"
          />
          <FormControlLabel
            control={
              <Checkbox checked={a4} onChange={(e) => setA4(e.target.checked)}/>
            }
            label="Answer 4"
          />
        </FormGroup>
        <Button variant="contained" color="primary">
          Submit
        </Button>
    </Grid>
  );
};

export default withStyles(styles)(Refreshr);
